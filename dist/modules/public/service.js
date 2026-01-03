"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicService = void 0;
const axios_1 = __importDefault(require("axios"));
const campaign_model_1 = require("../../model/campaign.model");
const env_1 = require("../../config/env");
const riskCalculator_1 = require("../../utils/riskCalculator");
const districts = [
    // Dhaka Division
    { district: "Dhaka", lat: 23.81, lon: 90.41 },
    { district: "Gazipur", lat: 23.99, lon: 90.42 },
    { district: "Narayanganj", lat: 23.62, lon: 90.50 },
    { district: "Tangail", lat: 24.25, lon: 89.92 },
    { district: "Manikganj", lat: 23.86, lon: 90.00 },
    { district: "Munshiganj", lat: 23.54, lon: 90.53 },
    { district: "Narsingdi", lat: 23.92, lon: 90.72 },
    { district: "Kishoreganj", lat: 24.44, lon: 90.78 },
    { district: "Faridpur", lat: 23.60, lon: 89.83 },
    { district: "Gopalganj", lat: 23.00, lon: 89.83 },
    { district: "Madaripur", lat: 23.16, lon: 90.20 },
    { district: "Rajbari", lat: 23.76, lon: 89.64 },
    { district: "Shariatpur", lat: 23.24, lon: 90.35 },
    // Rangpur Division
    { district: "Dinajpur", lat: 25.62, lon: 88.75 },
    { district: "Rangpur", lat: 25.75, lon: 89.25 },
    { district: "Kurigram", lat: 25.81, lon: 89.65 },
    { district: "Nilphamari", lat: 25.93, lon: 88.85 },
    { district: "Lalmonirhat", lat: 25.99, lon: 89.45 },
    { district: "Gaibandha", lat: 25.33, lon: 89.54 },
    { district: "Panchagarh", lat: 26.34, lon: 88.56 },
    { district: "Thakurgaon", lat: 26.03, lon: 88.47 },
    // Rajshahi Division
    { district: "Rajshahi", lat: 24.37, lon: 88.60 },
    { district: "Bogura", lat: 24.85, lon: 89.37 },
    { district: "Pabna", lat: 24.00, lon: 89.24 },
    { district: "Sirajganj", lat: 24.46, lon: 89.71 },
    { district: "Naogaon", lat: 24.80, lon: 88.95 },
    { district: "Natore", lat: 24.41, lon: 89.00 },
    { district: "Joypurhat", lat: 25.10, lon: 89.02 },
    { district: "Chapainawabganj", lat: 24.60, lon: 88.28 },
    // Chattogram Division
    { district: "Chattogram", lat: 22.36, lon: 91.78 },
    { district: "Cox's Bazar", lat: 21.43, lon: 92.01 },
    { district: "Comilla", lat: 23.46, lon: 91.18 },
    { district: "Noakhali", lat: 22.82, lon: 91.10 },
    { district: "Feni", lat: 23.01, lon: 91.40 },
    { district: "Brahmanbaria", lat: 23.96, lon: 91.11 },
    { district: "Chandpur", lat: 23.23, lon: 90.67 },
    { district: "Lakshmipur", lat: 22.94, lon: 90.83 },
    // Sylhet Division
    { district: "Sylhet", lat: 24.89, lon: 91.87 },
    { district: "Moulvibazar", lat: 24.48, lon: 91.77 },
    { district: "Habiganj", lat: 24.38, lon: 91.42 },
    { district: "Sunamganj", lat: 25.06, lon: 91.40 },
    // Barishal Division
    { district: "Barishal", lat: 22.70, lon: 90.37 },
    { district: "Bhola", lat: 22.69, lon: 90.65 },
    { district: "Patuakhali", lat: 22.36, lon: 90.33 },
    { district: "Pirojpur", lat: 22.58, lon: 90.00 },
    { district: "Barguna", lat: 22.10, lon: 90.12 },
    { district: "Jhalokathi", lat: 22.64, lon: 90.20 },
    // Khulna Division
    { district: "Khulna", lat: 22.82, lon: 89.56 },
    { district: "Jessore", lat: 23.17, lon: 89.21 },
    { district: "Satkhira", lat: 22.72, lon: 89.07 },
    { district: "Bagerhat", lat: 22.65, lon: 89.78 },
    { district: "Chuadanga", lat: 23.64, lon: 88.85 },
    { district: "Meherpur", lat: 23.76, lon: 88.63 },
    { district: "Magura", lat: 23.49, lon: 89.42 },
    { district: "Narail", lat: 23.17, lon: 89.50 },
    // Mymensingh Division
    { district: "Mymensingh", lat: 24.75, lon: 90.40 },
    { district: "Jamalpur", lat: 24.92, lon: 89.94 },
    { district: "Netrokona", lat: 24.88, lon: 90.72 },
    { district: "Sherpur", lat: 25.02, lon: 90.02 }
];
exports.publicService = {
    totalCampaigns: async (query) => {
        const { search, severity, category, division, district, upazila, page, limit } = query;
        console.log('checking frontend data', division, district, upazila);
        console.log('checking search', search);
        const filter = {
            request_status: { $regex: "Approved", $options: "i" }
        };
        if (category)
            filter.category = { $regex: category, $options: "i" };
        if (division)
            filter["location.division"] = { $regex: division, $options: "i" };
        if (district)
            filter["location.district"] = { $regex: district, $options: "i" };
        if (upazila)
            filter["location.upazila"] = { $regex: upazila, $options: "i" };
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } }
            ];
        }
        if (severity)
            filter["situation.severity"] = { $regex: severity, $options: "i" };
        let pageData = Number(page) || 1;
        let limitData = Number(limit) || 10;
        const skip = (pageData - 1) * limitData;
        const totalCampaign = await campaign_model_1.Campaign.find(filter)
            .skip(skip)
            .limit(Number(limitData))
            .sort({ created: -1 });
        const totalCount = await campaign_model_1.Campaign.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / limitData || 1);
        return {
            totalPages,
            page: Number(pageData),
            limit: Number(limitData),
            data: totalCampaign
        };
    },
    campaignDetails: async (payload) => {
        const id = payload;
        const campaign = await campaign_model_1.Campaign.findById(id);
        return campaign;
    },
    weatherRiskTrack: async () => {
        const weatherData = await Promise.all(districts.map(async (d) => {
            const res = await axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    lat: d.lat,
                    lon: d.lon,
                    units: "metric",
                    appid: env_1.config.open_weather_api
                }
            });
            const risk = (0, riskCalculator_1.calculateRisk)(res.data);
            return {
                district: d.district,
                lat: d.lat,
                lon: d.lon,
                riskScore: risk.score,
                riskLevel: risk.level,
                reasons: risk.reasons
            };
        }));
        // console.log('checking weather data', weatherData)
        return weatherData;
    }
};
//# sourceMappingURL=service.js.map