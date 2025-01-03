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

    try {
        const sessions = await Session.find({ expires: { $gt: new Date() } });

        if (!sessions || sessions.length === 0) {
            res.status(403).json({ message: "Session not found or expired." });
            return;
        }

        let matchedSession = null;
        for (const session of sessions) {
            const isValid = await compare(rawToken, session.sessionToken);
            if (isValid) {
                matchedSession = session;
                break;
            }
        }

        if (!matchedSession) {
            res.status(403).json({ message: "Invalid session token." });
            return;
        }

        (req as any).userId = matchedSession.userId.toString();

        next();
    } catch (err) {
        console.error("authMiddleware Error:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};
