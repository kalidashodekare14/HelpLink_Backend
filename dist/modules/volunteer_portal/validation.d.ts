import z from "zod";
export declare const requestStatusValidation: z.ZodObject<{
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
export declare const delivaryStatusValidation: z.ZodObject<{
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