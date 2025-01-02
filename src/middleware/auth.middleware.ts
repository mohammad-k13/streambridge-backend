import { NextFunction, Request, Response } from "express";
import Session from "../model/session/session.model";
import { compare } from "bcryptjs";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Authorization header is missing or invalid." });
        return;
    }

    const sessionToken = authHeader.split(" ")[1];

    try {
        const sessions = await Session.find({ expires: { $gt: new Date() } });
        console.log(sessions);
        const validSession = sessions
            .map((session) => {
                const isValid = session.compareSessionToken(sessionToken);
                return isValid ? session : null;
            })
            .find((session) => session !== null);

        if (!validSession) {
            res.status(403).json({ message: "Invalid or expired session token." });
            return;
        }

        (req as any).userId = validSession.userId.toString();

        next();
    } catch (err) {
        console.error("authMiddleware Error:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};
