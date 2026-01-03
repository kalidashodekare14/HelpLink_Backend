export declare const adminService: {
    overviewInfo: () => Promise<{
        totalUser: number;
        totalCampaign: number;
        totalAmount: any;
    }>;
    allUsers: (query: any) => Promise<(import("mongoose").Document<unknown, {}, import("../../model/user.model").IUser, {}, {}> & import("../../model/user.model").IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    userRoleManage: (payload: any) => Promise<(import("mongoose").Document<unknown, {}, import("../../model/user.model").IUser, {}, {}> & import("../../model/user.model").IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    userActiveManage: (payload: any) => Promise<(import("mongoose").Document<unknown, {}, import("../../model/user.model").IUser, {}, {}> & import("../../model/user.model").IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    allCampaigns: (query: any) => Promise<(import("mongoose").Document<unknown, {}, import("../../model/campaign.model").ICampaign, {}, {}> & import("../../model/campaign.model").ICampaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    campaignStatusManage: (payload: any) => Promise<(import("mongoose").Document<unknown, {}, import("../../model/campaign.model").ICampaign, {}, {}> & import("../../model/campaign.model").ICampaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    campaignDeliveryStatusManage: (payload: any) => Promise<(import("mongoose").Document<unknown, {}, import("../../model/campaign.model").ICampaign, {}, {}> & import("../../model/campaign.model").ICampaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=service.d.ts.map