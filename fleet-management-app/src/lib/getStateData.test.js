import getStateData from './getStateData';

describe('getStateData', () => {
  it('formats state history data and returns a promise', async () => {
    const testFilePath = '/src/data/test/equipmentStateHistory.json';
    const expectedResponse = [
      {
        equipmentId: "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
        lastState: {
          dateTime: "2021-02-01T12:00:00.000Z",
          name: "Manutenção",
          color: "#e74c3c"
        },
        stateHistory: [
          {
            dateTime: "2021-02-01T12:00:00.000Z",
            name: "Manutenção",
            color: "#e74c3c"
          },
          {
            dateTime: "2021-02-01T07:00:00.000Z",
            name: "Parado",
            color: "#f1c40f"
          },
          {
            dateTime: "2021-02-01T03:00:00.000Z",
            name: "Manutenção",
            color: "#e74c3c"
          },
        ]
      },
      {
        equipmentId: "1c7e9615-cc1c-4d72-8496-190fe5791c8b",
        lastState: {
          dateTime: "2021-02-01T22:00:00.000Z",
          name: "Manutenção",
          color: "#e74c3c"
        },
        stateHistory: [
          {
            dateTime: "2021-02-01T22:00:00.000Z",
            name: "Manutenção",
            color: "#e74c3c"
          },
          {
            dateTime: "2021-02-01T06:00:00.000Z",
            name: "Operando",
            color: "#2ecc71"
          },
          {
            dateTime: "2021-02-01T03:00:00.000Z",
            name: "Parado",
            color: "#f1c40f"
          },
        ]
      },
      {
        equipmentId: "2b5796cb-21c1-480e-8886-4498ea593a65",
        lastState: {
          dateTime: "2021-02-01T07:00:00.000Z",
          name: "Operando",
          color: "#2ecc71"
        },
        stateHistory: [
          {
            dateTime: "2021-02-01T07:00:00.000Z",
            name: "Operando",
            color: "#2ecc71"
          },
          {
            dateTime: "2021-02-01T05:00:00.000Z",
            name: "Parado",
            color: "#f1c40f"
          },
          {
            dateTime: "2021-02-01T03:00:00.000Z",
            name: "Manutenção",
            color: "#e74c3c"
          },
        ]
      }
    ];
    
    await expect(getStateData(testFilePath)).resolves.toEqual(expectedResponse);
  })
})