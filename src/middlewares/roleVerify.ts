import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/env";


export const roleVerify = (...roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
                return res.status(401).json({ message: "Access denied. No token provided." })
            }

            const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload;
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: "You don't have permission" });
            }
            next()
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" })
        }
    }
}