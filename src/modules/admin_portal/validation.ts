import z from "zod";



export const userRoleValidation = z.object({
    body: z.object({
        role: z.enum(["admin", "donor", "receiver", "volunteer"], "Invalid status")
    }),
    params: z.object({
        id: z.string().min(1, "Request ID is required")
    })
})

export const userActiveValidation = z.object({
    body: z.object({
        isActive: z.boolean()
    }),
    params: z.object({
        id: z.string().min(1, "Request ID is required")
    })
})

export const campaignStatusValidation = z.object({
    body: z.object({
        request_status: z.enum(["Pending", "Approved", "Rejected"], "Invalid status")
    }),
    params: z.object({
        id: z.string().min(1, "Request ID is required")
    })
})