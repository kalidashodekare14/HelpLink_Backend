import cloudinary from "../../config/cloudinary";
import { config } from "../../config/env";
import { Campaign } from "../../model/campaign.model";
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: config.gemini_api_key });

export const receiverService = {

    helpRequestPost: async (payload: any) => {
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
            throw new Error('Failed to get a valid response from AI model');
        }
        // Parse the AI response
        const parsed = JSON.parse(response.text);

        // Save to database
        const requestSave = await Campaign.create({
            ...requestData,
            situation: {
                severity: parsed.severity,
                score: parsed.score
            },
            request_status: parsed.score >= 69 ? "Approved" : "Pending"
        });


        return requestSave;
    },
    campaignImageUpload: async (payload: any) => {
        const files = payload;
        const imageUrls: string[] = [];
        for (const file of files) {
            const base64 = file.buffer.toString("base64");
            const dataUri = `data:${file.mimetype};base64,${base64}`;

            const uploadImage = await cloudinary.uploader.upload(dataUri, {
                folder: "campaigns"
            })
            if (!uploadImage.url) throw new Error("Image not uploaded");
            imageUrls.push(uploadImage.url);
        }
        return imageUrls;

    },
    trackRequest: async (payload: any) => {
        const email = payload;
        console.log('received email', email);
        const trackData = await Campaign.find({ receiver_email: email });
        return trackData;
    },
    campaignRequestInfo: async (payload: any) => {
        const campaignId = payload;
        const campaignData = await Campaign.findById(campaignId);
        return campaignData;
    },
    campaignRequestUpdate: async (payload: any) => {
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
            throw new Error('Failed to get a valid response from AI model');
        }
        // Parse the AI response
        const parsed = JSON.parse(response.text);

        const updatedCampaign = await Campaign.findByIdAndUpdate(
            campaignId,
            {
                ...updateData,
                situation: {
                    severity: parsed.severity,
                    score: parsed.score
                },
                request_status: parsed.score >= 69 ? "Approved" : "Pending"
            },
            { new: true }
        );
        return updatedCampaign;
    },
    campaignRequestDelete: async (id: any) => {
        console.log('checking error', id);
        const campaignDelete = await Campaign.findByIdAndDelete(id);
        return campaignDelete
    }
}