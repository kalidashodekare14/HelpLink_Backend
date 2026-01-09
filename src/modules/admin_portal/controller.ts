import sendResponse from "../../utils/sendResponse";
import { adminService } from "./service"
import { Request, Response } from "express";


// Overview Info Controll
export const overviewInfoControll = async (req: Request, res: Response) => {
    const result = await adminService.overviewInfo();
    sendResponse(res, {
        success: true,
        message: "Total User Get Successfully",
        data: result
    })
}

// Total User Controll
export const totalUsersControll = async (req: Request, res: Response) => {

    const result = await adminService.allUsers(req.query);
    sendResponse(res, {
        success: true,
        message: "Total User Get Successfully",
        data: result
    })
}

// User Role Manage
export const userRoleManageControll = async (req: Request, res: Response) => {
    const roleInfo = {
        id: req.params.id,
        role: req.body.role
    }
    console.log('checking params', req.params);
    console.log('checking body', req.body);
    const result = await adminService.userRoleManage(roleInfo);
    sendResponse(res, {
        success: true,
        message: "User Role Change Successfully",
        data: result
    })
}

// User Active Manage
export const userActiveManageControll = async (req: Request, res: Response) => {
    const roleInfo = {
        id: req.params.id,
        status: req.body.status
    }
    const result = await adminService.userActiveManage(roleInfo);
    sendResponse(res, {
        success: true,
        message: "User Active Change Successfully",
        data: result
    })
}

// Total Campaign 
export const totalCampaignControll = async (req: Request, res: Response) => {
    const result = await adminService.allCampaigns(req.query);
    sendResponse(res, {
        success: true,
        message: "Total Campaign Get Successfully",
        data: result
    })
}

// Campaign Status Change
export const campaignStatusManageControll = async (req: Request, res: Response) => {
    const requestInfo = {
        id: req.params.id,
        request_status: req.body.request_status
    }
    console.log('checking request status', req.body.request_status);
    const result = await adminService.campaignStatusManage(requestInfo);
    sendResponse(res, {
        success: true,
        message: "User Request Status Update Successfully",
        data: result
    })
}

// Campaign Delivery Status Change
export const campaignDevliveryStatusManageControll = async (req: Request, res: Response) => {
    const deliveryInfo = {
        id: req.params.id,
        delivery_status: req.body.delivery_status
    }
    const result = await adminService.campaignDeliveryStatusManage(deliveryInfo);
    sendResponse(res, {
        success: true,
        message: "User Delivery Status Update Successfully",
        data: result
    })
}


export const totalDonationControll = async (req: Request, res: Response) => {
    const result = await adminService.allDonations(req.query);
    sendResponse(res, {
        success: true,
        message: "Total Donation Get Successfully",
        data: result
    })
}