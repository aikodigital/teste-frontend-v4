import fetchMock from 'jest-fetch-mock';
import { IModelData } from './IModelService';
import { ModelService } from './ModelService';

fetchMock.enableMocks();

describe('ModelService', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch equipment models from the API correctly', async () => {
    const mockData: IModelData[] = [
      {
        id: 'model-1',
        name: 'Caminhão de carga',
        hourlyEarnings: [
          {
            equipmentStateId: '0808344c-454b-4c36-89e8-d7687e692d57',
            value: 100,
          },
          {
            equipmentStateId: 'baff9783-84e8-4e01-874b-6fd743b875ad',
            value: -5,
          },
          {
            equipmentStateId: '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f',
            value: -20,
          },
        ],
      },
      {
        id: 'model-2',
        name: 'Harvester',
        hourlyEarnings: [
          {
            equipmentStateId: '0808344c-454b-4c36-89e8-d7687e692d57',
            value: 200,
          },
          {
            equipmentStateId: 'baff9783-84e8-4e01-874b-6fd743b875ad',
            value: -10,
          },
          {
            equipmentStateId: '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f',
            value: -50,
          },
        ],
      },
    ];

    // Mock the API response
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const service = new ModelService();
    const data = await service.fetchAllModels();

    expect(fetchMock).toHaveBeenCalledWith('/data/equipmentModels.json');
    expect(data).toEqual(mockData);
  });

  it('should return an empty list if no equipment models are available', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));

    const service = new ModelService();
    const data = await service.fetchAllModels();

    expect(data).toEqual([]);
  });

  it('should return an empty list if the API call fails', async () => {
    fetchMock.mockReject(new Error('Network Error'));

    const service = new ModelService();
    const data = await service.fetchAllModels();

    expect(data).toEqual([]);
  });
});
