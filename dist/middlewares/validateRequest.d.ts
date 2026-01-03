import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
declare const validateRequest: (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default validateRequest;
//# sourceMappingURL=validateRequest.d.ts.map