import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const validateRequest =
    (schema: z.ZodTypeAny) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await schema.parseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params
                });
                next()
            } catch (error: any) {
                return res.status(400).json({
                    success: false,
                    message: "Validation Error",
                    errors: error.errors,
                });
            }
        }

export default validateRequest;