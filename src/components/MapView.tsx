import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbmZlcnJvbGkiLCJhIjoiY205MWdvdzM3MDByazJzb2RxNWM1aDByNiJ9.490tysNHeHNkTQWYjLhLsQ'

type PositionData = {
  name: string
  model: string
  date: string
  lat: number
  lng: number
  stateColor: string
  stateName: string
  stateHistory?: { name: string; date: string }[]
  path?: { lat: number; lon: number; date: string }[]
}

type Props = {
  positions: PositionData[]
  highlightName?: string | null
  visibleRoutes?: Record<string, boolean>
  startDate?: string
  endDate?: string
}

const hourlyRates: Record<string, number> = {
  'Operando': 100,
  'Parado': 30,
  'Manutenção': 0,
}

function calculateProductivityAndEarnings(history: { name: string; date: string }[]) {
  const stateNameMap: Record<string, string> = {
    operando: 'Operando',
    parado: 'Parado',
    manutencao: 'Manutenção',
  }

  const sorted = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const durations: Record<string, number> = {}

  for (let i = 0; i < sorted.length - 1; i++) {
    const start = new Date(sorted[i].date)
    const end = new Date(sorted[i + 1].date)
    const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)

    const rawName = sorted[i].name
    const name = stateNameMap[rawName.toLowerCase()] || rawName

    if (name && !isNaN(diffHours)) {
      durations[name] = (durations[name] || 0) + diffHours
    }
  }

  const total = Object.values(durations).reduce((a, b) => a + b, 0)
  const operando = durations['Operando'] || 0
  const productivity = total > 0 ? Math.round((operando / total) * 100) : 0

  let ganho = 0
  for (const [state, hours] of Object.entries(durations)) {
    const rate = hourlyRates[state] ?? 0
    ganho += rate * hours
  }

  return { productivity, ganho }
}

export function MapView({ positions, highlightName, visibleRoutes, startDate, endDate }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    const validPositions = positions.filter(p => p && p.lat !== undefined && p.lng !== undefined)
    const first = validPositions.at(0)
    const center: [number, number] = first ? [first.lng, first.lat] : [-51.9253, -14.2350]

    const map = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom: 13,
    })

    map.on('load', () => {
      const popups: mapboxgl.Popup[] = []

      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        const errorPopup = new mapboxgl.Popup({ closeButton: true, closeOnClick: false })
          .setHTML(`
      <strong>Erro:</strong><br/>
      A data inicial não pode ser maior que a data final. Ajuste o intervalo de datas.
    `)
          .addTo(map);

        setTimeout(() => {
          errorPopup.remove();
        }, 5000);
      }


      function closeAllPopups() {
        popups.forEach(p => p.remove())
      }

      validPositions.forEach((pos, idx) => {
        const filteredHistory = (pos.stateHistory ?? []).filter(entry => {
          const d = new Date(entry.date)
          return (!startDate || d >= new Date(startDate)) &&
            (!endDate || d <= new Date(endDate))
        })

        const routePoints = (pos.path ?? []).filter(p => {
          const d = new Date(p.date)
          return (!startDate || d >= new Date(startDate)) &&
            (!endDate || d <= new Date(endDate))
        })

        const lastState = filteredHistory.at(-1)
        const lastRoute = routePoints.at(-1)
        const baseDate = lastRoute?.date ?? lastState?.date

        const formattedDate = baseDate
          ? new Date(baseDate).toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
          })
          : '<em>Sem data no intervalo</em>'

        const stateName = lastState?.name ?? 'Sem estado'
        const stateColor =
          stateName === 'Operando' ? '#2ecc71' :
            stateName === 'Parado' ? '#f1c40f' :
              stateName === 'Manutenção' ? '#e74c3c' : '#999'

        const { productivity, ganho } = filteredHistory.length >= 2
          ? calculateProductivityAndEarnings(filteredHistory)
          : { productivity: 0, ganho: 0 }

        const historyHTML = filteredHistory.length
          ? `<div style="max-height: 100px; overflow-y: auto; margin-top: 6px;">
               <div style="position: sticky; top: 0; background: white;">
                 <strong>Histórico:</strong>
               </div><br/>${filteredHistory.map(entry => {
            const formatted = new Date(entry.date).toLocaleString('pt-BR', {
              day: '2-digit', month: '2-digit', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })
            return `${formatted} - ${entry.name}`
          }).join('<br/>')}
             </div>`
          : '<em>Sem histórico no intervalo selecionado.</em>'

        const extraInfo = `
          <br/><strong>Produtividade:</strong> ${productivity}%<br/>
          <strong>Ganho estimado:</strong> ${ganho.toLocaleString('pt-BR', {
          style: 'currency', currency: 'BRL'
        })}<br/>
        `

        const popup = new mapboxgl.Popup({ closeButton: true, closeOnClick: false })
          .setHTML(`
            <strong>${pos.name}</strong><br/>
            Modelo: ${pos.model}<br/>
            Data: ${formattedDate}<br/>
            <span style="color:${stateColor}">Estado: ${stateName}</span><br/>
            ${extraInfo}
            ${historyHTML}
          `)

        const marker = new mapboxgl.Marker({
          color: highlightName === pos.name ? '#000000' : stateColor
        })
          .setLngLat([pos.lng, pos.lat])
          .setPopup(popup)
          .addTo(map)

        let pinned = false;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const el = marker.getElement();
        const popupEl = popup.getElement();
        marker.setPopup(popup);

        el.addEventListener('mouseenter', () => {
          if (!pinned) {
            if (timeoutId) clearTimeout(timeoutId);
            closeAllPopups();
            popup.addTo(map);
          }
        });

        el.addEventListener('mouseleave', (e) => {
          if (!pinned && popupEl) {
            const related = e.relatedTarget as Node;
            timeoutId = setTimeout(() => {
              if (
                !popupEl.contains(document.activeElement) &&
                !popupEl.contains(related)
              ) {
                popup.remove();
              }
            }, 500);
          }
        });

        el.addEventListener('click', () => {
          pinned = !pinned;

          if (pinned) {
            if (timeoutId) clearTimeout(timeoutId);
            closeAllPopups();
            popup.addTo(map);

            const handleClickOutside = (e: MouseEvent) => {
              const target = e.target as Node;
              if (
                popupEl &&
                !popupEl.contains(target) &&
                !el.contains(target)
              ) {
                popup.remove();
                pinned = false;
                document.removeEventListener('click', handleClickOutside);
              }
            };

            document.addEventListener('click', handleClickOutside);
          } else {
            popup.remove();
          }
        });

        popupEl?.addEventListener('mouseenter', () => {
          if (!pinned && timeoutId) {
            clearTimeout(timeoutId);
          }
        });

        popupEl?.addEventListener('mouseleave', (e) => {
          if (!pinned && !el.contains(e.relatedTarget as Node)) {
            popup.remove();
          }
        });

        popups.push(popup);




        if (highlightName === pos.name) {
          map.flyTo({ center: [pos.lng, pos.lat], zoom: 15 })
        }

        if (visibleRoutes?.[pos.name] && routePoints.length > 1) {
          const coordinates = routePoints.map(p => [p.lon, p.lat])
          map.addSource(`route-${idx}`, {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: { type: 'LineString', coordinates },
              properties: {}
            }
          })
          map.addLayer({
            id: `route-${idx}`,
            type: 'line',
            source: `route-${idx}`,
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: { 'line-color': '#0074D9', 'line-width': 3 }
          })
        }
      })
    })



    return () => map.remove()
  }, [positions, highlightName, visibleRoutes, startDate, endDate])


  return <div ref={mapContainer} className="mapbox-container" />
}

