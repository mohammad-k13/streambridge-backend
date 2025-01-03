import { NextFunction, Request, Response } from "express";
import Session from "../model/session/session.model";
import { compare } from "bcryptjs";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Authorization header is missing or invalid." });
        return;
    }

    const rawToken = authHeader.split(" ")[1];
    console.log(rawToken)

    try {
        const session = await Session.findOne({ expires: { $gt: new Date() } });

        if (!session) {
            res.status(403).json({ message: "Session not found or expired." });
            return;
        }

        const isValid = await compare(rawToken, session.sessionToken);
        console.log(rawToken)
        if (!isValid) {
            res.status(403).json({ message: "Invalid session token." });
            return;
        }

        (req as any).userId = session.userId.toString();

        next();
    } catch (err) {
        console.error("authMiddleware Error:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};