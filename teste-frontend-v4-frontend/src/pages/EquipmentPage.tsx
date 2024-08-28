import { useNavigate, useParams } from 'react-router-dom'

import { useEquipmentLastPositions } from '@query/useEquipmentLastPositions'

import useFullEquipment from '@hooks/useFullEquipment'

import EquipmentMap from '@components/EquipmentMap'
import useEquipmentGains from '@hooks/useEquipmentGains'
import formatToBRL from '@services/formatToBRL'

const EquipmentPage = () => {
  const navigate = useNavigate()
  const params: any = useParams()

  const { isLoading, equipment, states } = useFullEquipment(params.id)
  const { data: positions } = useEquipmentLastPositions(params.id)
  const { isLoading: isLoadingGains, data: gains } = useEquipmentGains(
    params.id
  )
  console.log('data', gains)

  if (
    isLoading ||
    isLoadingGains ||
    !gains ||
    !equipment ||
    !states ||
    !positions
  ) {
    return <div>carregando</div>
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="h-full w-full flex flex-col gap-4 p-4 md:p-12 md:py-6 bg-blue-500 overflow-auto">
      <div className="flex">
        <span
          className="text-lg text-white cursor-pointer hover:underline"
          onClick={handleGoBack}
        >
          {`← voltar`}
        </span>
      </div>

      <header className="flex flex-row flex-wrap justify-between p-4 bg-white shadow-md rounded-xl">
        <div>
          <h1 className="text-2xl font-bold">{equipment.name}</h1>
          <h3 className="text-xl text-gray-400">{equipment.id}</h3>
          <h3 className="text-xl ">{equipment.equipmentModel.name}</h3>
        </div>

        <h1
          className="text-xl font-bold"
          style={{ color: equipment.state.color }}
        >
          {equipment.state.name}
        </h1>
      </header>

      <EquipmentMap equipment={equipment} positions={positions} />

      <div className="flex flex-row flex-wrap gap-4">
        <main className="p-4 min-w-[440px] h-min grow basis-0 bg-white shadow-md rounded-xl">
          <h1 className="flex gap-2 text-xl font-bold">
            <svg className="w-4" viewBox="0 0 512 512">
              <path d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4l54.1 0 109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109 0-54.1c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7L352 176c-8.8 0-16-7.2-16-16l0-57.4c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
            </svg>
            Histórico de operações
          </h1>
          <table className="w-full">
            <thead>
              <tr className="border-b-[1px] border-gray-400">
                <th className="w-4"></th>
                <th className="flex justify-start pl-2">data</th>
                <th>estado</th>
              </tr>
            </thead>
            <tbody>
              {states.map((state, i) => (
                <tr
                  key={`state_${i}`}
                  className="border-b-[1px] border-gray-300"
                >
                  <td className="px-2 w-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: state.state.color }}
                    ></div>
                  </td>
                  <td className="px-2 flex justify-start">
                    {new Date(state.date).toLocaleString()}
                  </td>
                  <td className="px-2"> {state.state.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        <main className="p-4 min-w-[440px] h-min grow basis-0 bg-white shadow-md rounded-xl">
          <h1 className="flex gap-2 text-xl font-bold">
            <svg className="w-4" viewBox="0 0 448 512">
              <path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z" />
            </svg>
            Histórico de produtividade e ganho
          </h1>
          <table className="w-full">
            <thead>
              <tr className="border-b-[1px] border-gray-400">
                <th className="px-2">data</th>
                <th className="px-2">horas trabalhadas</th>
                <th className="px-2">valor produzido</th>
                <th className="px-2">produtividade</th>
              </tr>
            </thead>
            <tbody>
              {gains.map((gain, i) => (
                <tr
                  key={`state_${i}`}
                  className="items-center text-gray-800 border-b-[1px] border-gray-200"
                >
                  <td className="px-2">
                    {gain.day.split('-').reverse().join('/')}
                  </td>
                  <td className="px-2">{gain.hours}</td>
                  <td className="px-2">
                    {formatToBRL.format(gain.moneyOfDay)}
                  </td>
                  <td
                    className="px-2"
                    style={{
                      color:
                        gain.productivity > 70
                          ? '#16a34a'
                          : gain.productivity > 30
                          ? '#eab308'
                          : '#dc2626'
                    }}
                  >
                    {gain.productivity + '%'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  )
}

export default EquipmentPage
