"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPressureCondition = exports.getHumidityCondition = exports.getTempCondition = void 0;
exports.calculateRisk = calculateRisk;
function calculateRisk(weather) {
    let score = 0;
    const reasons = [];
    const temp = weather.main.temp;
    const feelsLike = weather.main.feels_like;
    const humidity = weather.main.humidity;
    const pressure = weather.main.pressure;
    const windSpeed = weather.wind.speed;
    const rain1h = weather.rain?.["1h"] || 0;
    const condition = weather.weather[0].main;
    // Rain
    if (rain1h >= 30) {
        score += 30;
        reasons.push("Flood risk");
    }
    else if (rain1h >= 10) {
        score += 20;
        reasons.push("Heavy rain");
    }
    // Wind
    if (windSpeed >= 20) {
        score += 30;
        reasons.push("Storm danger");
    }
    else if (windSpeed >= 10) {
        score += 15;
        reasons.push("Strong wind");
    }
    // Heat
    if (feelsLike >= 40) {
        score += 25;
        reasons.push("Extreme heat");
    }
    else if (temp >= 35) {
        score += 15;
        reasons.push("High temperature");
    }
    // Pressure
    if (pressure < 990) {
        score += 25;
        reasons.push("Severe pressure drop");
    }
    else if (pressure < 1000) {
        score += 15;
        reasons.push("Low pressure");
    }
    // Humidity
    if (humidity > 85) {
        score += 10;
        reasons.push("High humidity");
    }
    // Weather condition
    if (condition === "Thunderstorm") {
        score += 40;
        reasons.push("Thunderstorm");
    }
    score = Math.min(score, 100);
    let level = "Low";
    if (score >= 80)
        level = "Extreme";
    else if (score >= 60)
        level = "High";
    else if (score >= 30)
        level = "Medium";
    return { score, level, reasons };
}
const getTempCondition = (main) => {
    const temp = main.temp;
    let condition = "";
    if (temp < 20) {
        condition = "Cold";
    }
    else if (temp >= 20 && temp <= 32) {
        condition = "Normal";
    }
    else if (temp > 32) {
        condition = "Heat Risk";
    }
    return {
        temp,
        condition
    };
};
exports.getTempCondition = getTempCondition;
const getHumidityCondition = (humidity) => {
    let condition = "";
    if (humidity < 30) {
        condition = "Low Humidity";
    }
    else if (humidity < 60) {
        condition = "Normal Humidity";
    }
    else {
        condition = "High Humidity";
    }
    return {
        humidity,
        condition
    };
};
exports.getHumidityCondition = getHumidityCondition;
const getPressureCondition = (pressure) => {
    let condition = "";
    if (pressure < 1005) {
        condition = "Storm Likely";
    }
    else if (pressure <= 1015) {
        condition = "Slight Risk";
    }
    else {
        condition = "Stable";
    }
    return {
        pressure,
        condition
    };
};
exports.getPressureCondition = getPressureCondition;
//# sourceMappingURL=riskCalculator.js.map