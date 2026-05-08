// External Imports
import { GoogleGenAI } from "@google/genai";
// Internal Imports
import { config } from "../../config/env";
import { Campaign } from "../../model/campaign.model";
import { RELIEF_AI_SYSTEM_PROMPT } from "./ai.prompts";
import generateWithRetry from "./retryWrapper";
const ai = new GoogleGenAI({ apiKey: config.gemini_api_key });

export const publicService = {
  totalCampaigns: async (query: any) => {
    const {
      search,
      severity,
      category,
      division,
      district,
      upazila,
      page,
      limit,
    } = query;
    console.log("checking frontend data", division, district, upazila);
    console.log("checking search", search);
    const filter: any = {
      request_status: { $regex: "Approved", $options: "i" },
    };
    if (category) filter.category = { $regex: category, $options: "i" };
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

    const totalCampaign = await Campaign.find(filter)
      .skip(skip)
      .limit(Number(limitData))
      .sort({ created: -1 });

    const totalCount = await Campaign.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limitData || 1);
    return {
      totalPages,
      page: Number(pageData),
      limit: Number(limitData),
      data: totalCampaign,
    };
  },
  campaignDetails: async (payload: any) => {
    const id = payload;
    const campaign = await Campaign.findById(id);
    return campaign;
  },
  chatbotAI: async (payload: any) => {
    // Long messsage error
    if (payload.message.length > 1000) {
      throw new Error("Message to long");
    }

    //    AI content generation
    const fn = async () => {
      return await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: `
      ${RELIEF_AI_SYSTEM_PROMPT}
      User Role: ${payload.send}
      User Message: ${payload.message}
      `,
      });
    };

    const response = await generateWithRetry(fn);

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
