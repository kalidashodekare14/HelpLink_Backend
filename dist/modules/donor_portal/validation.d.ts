import z from "zod";
export declare const donorJoinCampaignValidation: z.ZodObject<{
    body: z.ZodObject<{
        donor_name: z.ZodString;
        donor_email: z.ZodString;
        message: z.ZodString;
        amount: z.ZodNumber;
        request_status: z.ZodOptional<z.ZodEnum<{
            Cancelled: "Cancelled";
            Unpaid: "Unpaid";
            Paid: "Paid";
        }>>;
        payment_method: z.ZodOptional<z.ZodEnum<{
            Nagad: "Nagad";
            SSLCommerz: "SSLCommerz";
            Bkash: "Bkash";
        }>>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=validation.d.ts.map