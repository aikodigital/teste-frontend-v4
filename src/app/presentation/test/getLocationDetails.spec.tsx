import { getLocation } from '../modules/DetailSection'
describe('getLocation Function', () => {
  it('should return the correct equipments location based on the given ID', async () => {
    const mockId = '1d222cdc-01dd-4caa-8934-5351d3995cfb'

    const result = await getLocation(mockId)

    console.log(result)

    expect(result).toBeInstanceOf(Object)
  })
})
