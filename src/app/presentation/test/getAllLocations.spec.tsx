import { getLocation } from '../modules/TableSection'
describe('getLocation Function', () => {
  it('should return the correct all equipments location', async () => {
    const result = await getLocation()

    console.log(result)

    expect(result).toBeInstanceOf(Object)
  })
})
