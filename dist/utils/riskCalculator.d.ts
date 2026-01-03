type RiskResult = {
    score: number;
    level: "Low" | "Medium" | "High" | "Extreme";
    reasons: string[];
};
export declare function calculateRisk(weather: any): RiskResult;
export {};
//# sourceMappingURL=riskCalculator.d.ts.map