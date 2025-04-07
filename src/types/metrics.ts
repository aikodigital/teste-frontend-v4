export type ProductivityData = {
  currentDate: {
    percentage: number;
    operatingHours: number;
    totalHours: number;
  };
  totalPeriod: {
    percentage: number;
    operatingHours: number;
    totalHours: number;
  };
};

export type EarningsData = {
  currentDate: number;
  totalPeriod: number;
  breakdown: {
    operating: number;
    stopped: number;
    maintenance: number;
  };
};