"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicService = void 0;
// External Imports
const genai_1 = require("@google/genai");
// Internal Imports
const env_1 = require("../../config/env");
const campaign_model_1 = require("../../model/campaign.model");
const ai_prompts_1 = require("./ai.prompts");
const retryWrapper_1 = __importDefault(require("./retryWrapper"));
const ai = new genai_1.GoogleGenAI({ apiKey: env_1.config.gemini_api_key });
exports.publicService = {
    totalCampaigns: async (query) => {
        const { search, severity, category, division, district, upazila, page, limit, } = query;
        console.log("checking frontend data", division, district, upazila);
        console.log("checking search", search);
        const filter = {
            request_status: { $regex: "Approved", $options: "i" },
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
            filter.$or = [{ title: { $regex: search, $options: "i" } }];
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
            data: totalCampaign,
        };
    },
    campaignDetails: async (payload) => {
        const id = payload;
        const campaign = await campaign_model_1.Campaign.findById(id);
        return campaign;
    },
    chatbotAI: async (payload) => {
        // Long messsage error
        if (payload.message.length > 1000) {
            throw new Error("Message to long");
        }
        //    AI content generation
        const fn = async () => {
            return await ai.models.generateContent({
                model: "gemini-2.5-flash-lite",
                contents: `
      ${ai_prompts_1.RELIEF_AI_SYSTEM_PROMPT}
      User Role: ${payload.send}
      User Message: ${payload.message}
      `,
            });
        };
        const response = await (0, retryWrapper_1.default)(fn);
        const responseData = response.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!responseData) {
            throw new Error("No AI response received");
        }
        return {
            send: "ai",
            replay: responseData,
        };
    },
};
//# sourceMappingURL=service.js.map