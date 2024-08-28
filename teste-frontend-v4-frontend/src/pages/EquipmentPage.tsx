import useFullEquipment from '../hooks/useFullEquipment'

const ID = 'a7c53eb1-4f5e-4eba-9764-ad205d0891f9'

const EquipmentPage = () => {
  const { isLoading, equipment, states } = useFullEquipment(ID)

  if (isLoading || !equipment || !states) {
    return <div>carregando</div>
  }

  return (
    <div className="h-full w-full flex flex-col gap-2 p-12 bg-gray-50 overflow-auto">
      <div className="flex">
        <span className="text-lg text-gray-500 cursor-pointer">
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

      <main className="p-4 bg-white shadow-md rounded-xl">
        <h1 className="text-xl font-bold">Histórico </h1>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>data</th>
              <th>estado</th>
            </tr>
          </thead>
          <tbody>
            {states.map((state, i) => (
              <tr key={`state_${i}`} className="items-center">
                <td className="px-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: state.state.color }}
                  ></div>
                </td>
                <td className="px-2">{state.date}</td>
                <td className="px-2"> {state.state.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg">
        {/* <EquipmentMap equipment={equipment} states={equipmentStates.states} /> */}
      </div>
    </div>
  )
}

export default EquipmentPage
