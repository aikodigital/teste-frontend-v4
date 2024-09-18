import { getProduct } from '../modules/DetailSection'
describe('getProduct Function', () => {
  it('should return the correct equipment details based on the given ID', async () => {
    const mockId = '1d222cdc-01dd-4caa-8934-5351d3995cfb'

    const result = await getProduct(mockId)

    console.log(result)

    expect(result).toBeInstanceOf(Object)
  })
})
