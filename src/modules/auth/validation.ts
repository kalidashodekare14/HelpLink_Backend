import { z } from 'zod';

export const registerValidation = z.object({
    body: z.object({
        name: z.string().min(2, "Name is required"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters")
    })
})

export const loginValidation = z.object({
    body: z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(6, "Password is required")
    })
})

