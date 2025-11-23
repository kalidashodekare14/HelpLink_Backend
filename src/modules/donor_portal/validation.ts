import z from "zod";


export const donorJoinCampaignValidation = z.object({
    body: z.object({
        donor_email: z.string().email("Valid donor email required"),
        amount: z.number().min(1, "Amount must be greater than 0"),
        message: z.string(),
        status: z.enum(["Pending", "Confirmed", "Cancelled", "Approved"]).optional()
    })
})