export class equipmentListGoupModel {
  constructor(
    public id: string,
    public equipmentModelId: string,
    public name: string,
    public modelo: {
      name: string | any;
      hourlyEarnings: { state: string; value: number; color: string }[];
    },
    public positionHitory:
      | {
          date: Date | string;
          lat: number;
          lon: number;
        }[],
    public stateHistory: { date: Date | string; equipmentStateId: string }[]
  ) {}
}
