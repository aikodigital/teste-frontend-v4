interface StateList {
  date: string;
  equipmentStateId: string;

}
export default interface StateHistory {
  equipmentId: string;
  states: StateList[];
}