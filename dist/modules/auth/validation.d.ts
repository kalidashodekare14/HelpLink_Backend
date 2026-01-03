import { z } from 'zod';
export declare const registerValidation: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        role: z.ZodEnum<{
            donor: "donor";
            receiver: "receiver";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const loginValidation: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=validation.d.ts.map