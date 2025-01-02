/**
 * Handles authentication-related routes.
 */
import { Request, Response, Router } from "express";
import User from "../model/user/user.model";
import { compare } from "bcryptjs";
import Session from "../model/session/session.model";
import { authMiddleware } from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).send({ message: "All information are Requirement" });
        return;
    }

    try {
        const user = await User.findOne({
            username,
        });
        if (!user) {
            res.status(404).send({ message: "user not found" });
            return;
        }

        const passwordMatch = user?.comparePassword(password);
        if (!passwordMatch) {
            res.status(404).send({ message: "username or password is wrong" });
            return;
        }

        const now = new Date();
        const expires = now.setHours(now.getDay() + 15);

        const session = await Session.create({
            sessionToken: user?.id,
            userId: user?.id,
            expires,
        });
        res.status(200).send({ message: "logged In", sessionToken: session.sessionToken, expires: session.expires });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});

authRouter.post("/register", async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        res.status(400).send({ message: "All information are required" });
        return;
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).send({ message: "this email is taken" });
            return;
        }

        const user = await User.create({ email, password, username });
        res.status(200).send({ message: "user created!", user });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});

authRouter.post("/validation-session", async (req: Request, res: Response) => {
    const { sessionToken, username } = req.body;

    if (!sessionToken || !username) {
        res.status(400).send({ message: "All information are Requirement" });
        return;
    }

    try {
        const session = await Session.findOne({ sessionToken });
        if (!session) {
            res.status(404).send({ message: "Session not found" });
            return;
        }

        const user = await User.findById(session.userId);
        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        }

        if (user.username !== username) {
            res.status(404).send({ message: "username not match" });
            return;
        }

        res.status(200).send({ message: "Session is valid" });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});

export default authRouter;
