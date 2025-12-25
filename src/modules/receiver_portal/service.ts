import { config } from "../../config/env";
import { Campaign } from "../../model/campaign.model";
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: config.gemini_api_key });

export const receiverService = {

    helpRequestPost: async (payload: any) => {
        const requestData = payload;
        console.log('payload received in service', payload);
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
        const parsed = JSON.parse(response.text);


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
    trackRequest: async (payload: any) => {
        const email = payload;
        console.log('received email', email);
        const trackData = await Campaign.find({ receiver_email: email });
        return trackData;
    }
}