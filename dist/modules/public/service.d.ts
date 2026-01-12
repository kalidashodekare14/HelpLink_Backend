export declare const publicService: {
    totalCampaigns: (query: any) => Promise<{
        totalPages: number;
        page: number;
        limit: number;
        data: (import("mongoose").Document<unknown, {}, import("../../model/campaign.model").ICampaign, {}, {}> & import("../../model/campaign.model").ICampaign & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    campaignDetails: (payload: any) => Promise<(import("mongoose").Document<unknown, {}, import("../../model/campaign.model").ICampaign, {}, {}> & import("../../model/campaign.model").ICampaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    weatherRiskTrack: () => Promise<{
        district: string;
        lat: number;
        lon: number;
        riskScore: number;
        riskLevel: "High" | "Medium" | "Low" | "Extreme";
        reasons: string[];
        temperature: {
            temp: any;
            condition: string;
        };
        humidity: {
            humidity: number;
            condition: string;
        };
        pressure: {
            pressure: number;
            condition: string;
        };
    }[]>;
};
//# sourceMappingURL=service.d.ts.map