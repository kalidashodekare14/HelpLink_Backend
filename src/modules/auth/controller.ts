import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./service"
import { Request, Response } from "express";


export const registerUser = async (req: Request, res: Response) => {
    console.log('checking user data', req.body)
    const result = await AuthService.registerUser(req.body);
    sendResponse(res, {
        success: true,
        message: "User registered successfully!",
        data: result
    })
}

export const loginUser = async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body);
    sendResponse(res, {
        success: true,
        message: "User login successfully!",
        data: result
    })
}