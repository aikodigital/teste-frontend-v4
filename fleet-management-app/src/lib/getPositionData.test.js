import getPositionData from './getPositionData';

describe('getPositionData', () => {
  it('formats position data and returns a promise', async () => {
    const testFilePath = '/src/data/test/equipmentPositionHistory.json';
    const expectedResponse = [
      {
        equipmentId: "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
        lastLat: -19.171667,
        lastLon: -46.044589
      },
      {
        equipmentId: "1c7e9615-cc1c-4d72-8496-190fe5791c8b",
        lastLat: -19.07747,
        lastLon: -45.958734
      },
      {
        equipmentId: "2b5796cb-21c1-480e-8886-4498ea593a65",
        lastLat: -19.223635,
        lastLon: -46.136626
      }
    ];
    
    await expect(getPositionData(testFilePath)).resolves.toEqual(expectedResponse);
  })
})