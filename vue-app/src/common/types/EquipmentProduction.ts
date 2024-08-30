export type ResultAllProductionDays = {
    [key: string]: {
        [key: string]: number;
    };
}

export type ResultDailyProductivy = {
    [key: string]: number;
}

export type EquipmentProduction = {
    date: string,
    productivy: number,
    earning: number,
}
