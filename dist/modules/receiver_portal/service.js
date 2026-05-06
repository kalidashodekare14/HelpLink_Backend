"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiverService = void 0;
const genai_1 = require("@google/genai");
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const env_1 = require("../../config/env");
const campaign_model_1 = require("../../model/campaign.model");
const ai = new genai_1.GoogleGenAI({ apiKey: env_1.config.gemini_api_key });
exports.receiverService = {
    helpRequestPost: async (payload) => {
        const requestData = payload;
        //    AI content generation
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: `
            You are an AI disaster response system.
            Classify the following help request into High, Medium, or Low severity.

            Return ONLY valid JSON.
            Do NOT use markdown.
            Do NOT use backticks.
            Do NOT explain anything.

            JSON format:
            {
                "severity": "High | Medium | Low",
                "score": number (0  to 100)
            }

            Help Request:
            "${payload.title}"
            `,
        });
        if (!response.text) {
            throw new Error("Failed to get a valid response from AI model");
        }
        // Parse the AI response
        const parsed = JSON.parse(response.text);
        // Save to database
        const requestSave = await campaign_model_1.Campaign.create({
            ...requestData,
            situation: {
                severity: parsed.severity,
                score: parsed.score,
            },
            request_status: parsed.score >= 69 ? "Approved" : "Pending",
        });
        return requestSave;
    },
    campaignImageUpload: async (payload) => {
        const files = payload;
        const imageUrls = [];
        for (const file of files) {
            const base64 = file.buffer.toString("base64");
            const dataUri = `data:${file.mimetype};base64,${base64}`;
            const uploadImage = await cloudinary_1.default.uploader.upload(dataUri, {
                folder: "campaigns",
            });
            if (!uploadImage.url)
                throw new Error("Image not uploaded");
            imageUrls.push(uploadImage.url);
        }
        return imageUrls;
    },
    trackRequest: async (payload) => {
        const email = payload;
        console.log("received email", email);
        const trackData = await campaign_model_1.Campaign.find({ receiver_email: email });
        return trackData;
    },
    campaignRequestInfo: async (payload) => {
        const campaignId = payload;
        const campaignData = await campaign_model_1.Campaign.findById(campaignId);
        return campaignData;
    },
    campaignRequestUpdate: async (payload) => {
        const { campaignId, updateData } = payload;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: `
            You are an AI disaster response system.
            Classify the following help request into High, Medium, or Low severity.

            Return ONLY valid JSON.
            Do NOT use markdown.
            Do NOT use backticks.
            Do NOT explain anything.

            JSON format:
            {
                "severity": "High | Medium | Low",
                "score": number (0  to 100)
            }

            Help Request:
            "${updateData.title}"
            `,
        });
        if (!response.text) {
            throw new Error("Failed to get a valid response from AI model");
        }
        // Parse the AI response
        const parsed = JSON.parse(response.text);
        const updatedCampaign = await campaign_model_1.Campaign.findByIdAndUpdate(campaignId, {
            ...updateData,
            situation: {
                severity: parsed.severity,
                score: parsed.score,
            },
            request_status: parsed.score >= 69 ? "Approved" : "Pending",
        }, { new: true });
        return updatedCampaign;
    },
    campaignRequestDelete: async (id) => {
        console.log("checking error", id);
        const campaignDelete = await campaign_model_1.Campaign.findByIdAndDelete(id);
        return campaignDelete;
    },
};
//# sourceMappingURL=service.js.map