"use client"
import 'ol/ol.css';
import { useEffect, useState } from 'react';
import { Feature, Map, Overlay, View } from 'ol';

import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { XYZ } from 'ol/source';

import { getEquipament, listEquipament } from '@/controller/equipment';
import { getLastPositionHistory } from '@/controller/equipmentPositionHistory';
import { getIcon } from '@/controller/iconEquipment';

import styles from "./page.module.css";
import { getLastStateHistory } from '@/controller/equipmentStateHistory';
import { IPosition } from '@/interface/positions';
import { Modal } from '@/components/Modal';
import { IEquipamentView } from '@/interface/equipament';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [equipment, setEquipment] = useState<IEquipamentView>({} as IEquipamentView)
  let mapObj: Map;

  async function loadEquipment() {
    const list = listEquipament();

    //PEGAR OS EQUIPAMENTOS E ULTIMA POSIÇÃO
    let listPostions: IPosition[] = [];
    await Promise.all(list.map(async (equipment) => {
      const [position, state] = await Promise.all([getLastPositionHistory(equipment.id), getLastStateHistory(equipment.id)])
      listPostions.push({
        id: equipment.id,
        equipmentModelId: equipment.equipmentModelId,
        name: equipment.name,
        date: position.date,
        lat: position.lat,
        lon: position.lon,
        state: state
      })
    }))

    //MONTA OS ICONES DE CADA EQUIPAMENTO
    let listFeature: Feature<Point>[] = [];
    await Promise.all(listPostions.map(position => {
      const iconFeature = new Feature({
        geometry: new Point(fromLonLat([position.lon, position.lat])),
        equipmentId: position.id,
        html: `<b>${position.name}</b><br />${position.state.name}`
      });

      iconFeature.setStyle(new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: getIcon(position.equipmentModelId),
        }),
      }))

      listFeature.push(iconFeature)
    }))

    loadMap(listFeature)

  }

  function loadMap(listFeature: Feature<Point>[]) {
    var container = document.getElementById('popup')!;
    var content = document.getElementById('popupcontent')!;

    //MONTA O MAPA
    const vectorSource = new VectorSource({
      features: listFeature,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const osmLayer = new TileLayer({
      source: new XYZ({
        url: "https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
        crossOrigin: 'anonymous'
      })
    })

    if (!mapObj) {
      mapObj = new Map({
        target: 'map',
        view: new View({
          center: fromLonLat([-46.06338, -19.163073]),
          zoom: 11,
        }),
        layers: [osmLayer, vectorLayer],
      });
    }

    const popup = new Overlay({
      element: container,
      autoPan: true
    });

    mapObj.addOverlay(popup);

    mapObj.on('pointermove', function (evt) {
      const feature = mapObj.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        const coordinate = evt.coordinate;

        content.innerHTML = feature.get('html');
        popup.setPosition(coordinate);
      } else {
        popup.setPosition(undefined);
      }
    });

    mapObj.on('click', function (evt) {
      const feature = mapObj.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        handleModal(feature.get('equipmentId'))
      }
    })
  }

  async function handleModal(equipmentId: string) {
    const response = await getEquipament(equipmentId)
    setEquipment(response)
    setModalVisible(true)
  }

  function handleCloseModal() {
    setModalVisible(false)
    setEquipment({} as IEquipamentView)
  }

  useEffect(() => {
    loadEquipment()
  }, []);

  return (
    <div className={styles.map} id="map">
      <div id="popup" className={styles.olpopup}>
        <div id="popupcontent" />
      </div>
      {modalVisible && <Modal data={equipment} handleClose={handleCloseModal}/>}
    </div>
  )
}
