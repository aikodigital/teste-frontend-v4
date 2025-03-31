export interface IActivity {
  day: string;
  date: string;
  status: string;
}

export interface IProductivity {
  [key: string]: number
}

export interface IPerformance {
  allProductivity: string;
  lastWeekProductivity: string;
}