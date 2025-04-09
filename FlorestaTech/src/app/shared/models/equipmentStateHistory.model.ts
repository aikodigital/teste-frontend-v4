export class equipmentStateHistoryModel {
  constructor(
    public equipmentId: string,
    public states: [
      {
        date: string | Date,
        equipmentStateId: string,
      },
    ]
  ) { }
}
