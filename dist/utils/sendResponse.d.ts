import { Response } from "express";
declare const sendResponse: (res: Response, data: {
    success: boolean;
    message: string;
    data?: any;
}) => void;
export default sendResponse;
//# sourceMappingURL=sendResponse.d.ts.map