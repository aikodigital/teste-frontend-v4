export class equipmentDataModel {
  constructor(
    public id: string,
    public name: string,
    public hourlyEarnings: [
      {
        equipmentStateId: string,
        value: number
      },
    ]
  ) { }
}
