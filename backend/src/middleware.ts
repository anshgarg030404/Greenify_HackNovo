import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

// Extend the Request interface to include `id`
interface AuthenticatedRequest extends Request {
    id?: string;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    const token = req.headers.authorization as string;
    console.log(token)

    if (!token) {
        res.status(403).json({ message: "Authorization token missing" });
        return;
    }

    try {
        const payload = jwt.verify(token, JWT_PASSWORD) as jwt.JwtPayload;
        if (payload) {
            req.id = payload.id;
            next(); // Continue to the next middleware
        } else {
            res.status(403).json({ message: "Invalid token" });
        }
    } catch (error) {
        res.status(403).json({ message: "You are not logged in" });
    }
}
