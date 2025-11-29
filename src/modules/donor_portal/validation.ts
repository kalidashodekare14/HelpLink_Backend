import z from "zod";

export const donorJoinCampaignValidation = z.object({
    body: z.object({
        donor_name: z.string(),
        donor_email: z.string().email("Valid donor email required"),
        message: z.string(),
        amount: z.number().min(1, "Amount must be greater than 0"),
        request_status: z.enum(["Unpaid", "Paid", "Cancelled"]).optional(),
        payment_method: z.enum(["Bkash", "Nagad", "SSLCommerz"]).optional()
    }),
    params: z.object({
        id: z.string().min(1, "Campaign Id is required")
    })
})