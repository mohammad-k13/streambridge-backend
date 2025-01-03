import { Socket } from "socket.io";
import Session from "../model/session/session.model";
import { compare } from "bcryptjs";
import { SocketWithUserId } from "../socket";

export const socketAuthMiddleware = async (socket: Socket, next: (err?: Error) => void) => {
    const rawToken = socket.handshake.auth.token;
    if (!rawToken) {
        return next(new Error("Authorization header is missing or invalid."));
    }

    try {
        const sessions = await Session.find({ expires: { $gt: new Date() } });

        if (!sessions || sessions.length === 0) {
            return next(new Error("Session not found or expired."));
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
            return next(new Error("Invalid session token."));
        }
        (socket as SocketWithUserId).userId = matchedSession.userId.toString();

        next();
    } catch (err) {
        console.error("Socket Auth Middleware Error:", err);
        next(new Error("Internal server error."));
    }
};
