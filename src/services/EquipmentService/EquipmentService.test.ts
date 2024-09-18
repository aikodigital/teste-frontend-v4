import { EquipmentService } from './EquipmentService';
import { EquipmentData } from './IEquipmentService';

describe('EquipmentService', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('deve buscar dados da API corretamente', async () => {
    const mockData: EquipmentData[] = [
      { id: '1', equipmentModelId: 'model-1', name: 'CA-0001' },
      { id: '2', equipmentModelId: 'model-2', name: 'CA-0002' },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const service = new EquipmentService();
    const data = await service.fetchAllEquipmentData();

    expect(fetchMock).toHaveBeenCalledWith('/data/equipmentData.json');
    expect(data).toEqual(mockData);
  });

  it('deve retornar uma lista vazia em caso de falha na API', async () => {
    fetchMock.mockReject(new Error('Erro de rede'));

    const service = new EquipmentService();
    const data = await service.fetchAllEquipmentData();

    expect(data).toEqual([]);
  });
});
