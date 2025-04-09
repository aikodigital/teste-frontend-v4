export class equipmentPositionHistoryModel {
  constructor(
    public equipmentId: string,
    public positions: [
      {
        date: string | Date,
        lat: number,
        lon: number,
      },
    ]
  ) { }
}
