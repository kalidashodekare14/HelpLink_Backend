import { Request, Response } from "express";
export declare const totalCampaignsControll: (req: Request, res: Response) => Promise<void>;
export declare const campaignDetailsControll: (req: Request, res: Response) => Promise<void>;
export declare const userRolecontroll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const weatherRiskTrackControll: (req: Request, res: Response) => Promise<void>;
export declare const bikashPaymentCallbackControll: (req: Request, res: Response) => Promise<void>;
export declare const sslcommerzPaymentSuccessControll: (req: Request, res: Response) => Promise<void>;
export declare const sslcommerzPaymentFailControll: (req: Request, res: Response) => Promise<void>;
export declare const sslcommerzPaymentCancelControll: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=controller.d.ts.map