import z from "zod";
export declare const userRoleValidation: z.ZodObject<{
    body: z.ZodObject<{
        role: z.ZodEnum<{
            admin: "admin";
            donor: "donor";
            receiver: "receiver";
            volunteer: "volunteer";
        }>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const userActiveValidation: z.ZodObject<{
    body: z.ZodObject<{
        status: z.ZodBoolean;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const campaignStatusValidation: z.ZodObject<{
    body: z.ZodObject<{
        request_status: z.ZodEnum<{
            Pending: "Pending";
            Approved: "Approved";
            Rejected: "Rejected";
        }>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const campaignDeliStatusValidation: z.ZodObject<{
    body: z.ZodObject<{
        delivery_status: z.ZodEnum<{
            Assigned: "Assigned";
            "Picked Up": "Picked Up";
            Delivered: "Delivered";
            Cancelled: "Cancelled";
        }>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=validation.d.ts.map