type RiskResult = {
    score: number;
    level: "Low" | "Medium" | "High" | "Extreme";
    reasons: string[];
};
export declare function calculateRisk(weather: any): RiskResult;
export declare const getTempCondition: (main: any) => {
    temp: any;
    condition: string;
};
export declare const getHumidityCondition: (humidity: number) => {
    humidity: number;
    condition: string;
};
export declare const getPressureCondition: (pressure: number) => {
    pressure: number;
    condition: string;
};
export {};
//# sourceMappingURL=riskCalculator.d.ts.map