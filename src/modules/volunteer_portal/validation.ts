import z from "zod";



export const requestStatusValidation = z.object({
    body: z.object({
        request_status: z.enum(["Pending", "Approved", "Rejected"], "Invalid Request status")
    }),
    params: z.object({
        id: z.string().min(1, "Request ID is required")
    })
})


export const delivaryStatusValidation = z.object({
    body: z.object({
        delivery_status: z.enum(["Assigned", "Picked Up", "Delivered", "Cancelled"], "Invalid Request status")
    }),
    params: z.object({
        id: z.string().min(1, "Request ID is required")
    })
})