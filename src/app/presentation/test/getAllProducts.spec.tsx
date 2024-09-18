import { getProduct } from '../modules/TableSection'
describe('getProduct Function', () => {
  it('should return the correct all the equipment details', async () => {
    const result = await getProduct()

    console.log(result)

    expect(result).toBeInstanceOf(Object)
  })
})
