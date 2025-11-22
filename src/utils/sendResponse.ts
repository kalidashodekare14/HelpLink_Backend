
import { Response } from "express";

const sendResponse = (
    res: Response,
    data: { success: boolean, message: string, data?: any }
) => {
    res.status(data.success ? 200 : 400).json(data);
}

export default sendResponse