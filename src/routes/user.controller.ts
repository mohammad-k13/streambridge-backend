import { Request, Response, Router } from "express";
import User from "../model/user/user.model";
import { ExitStatus } from "typescript";
import { authMiddleware } from "../middleware/auth.middleware";

const userRouter = Router();

export interface RequestWithUserId extends Request {
    userId?: any;
}

userRouter.get("/users", authMiddleware, async (req: RequestWithUserId, res: Response) => {
    try {
        const filters = req.query;
        const query: any = {};
        const userId = req.userId;

        if (userId) {
            query._id = { $ne: userId };
        }

        if (typeof filters.username === "string" && filters.username.trim() === "") {
            res.status(200).send([]);
            return;
        }

        if (filters.username) {
            query.username = { $regex: `^${filters.username}`, $options: "i" };
        }

        for (const [key, value] of Object.entries(filters)) {
            if (value && key !== "username") {
                query[key] = value;
            }
        }

        const users = await User.find(query, { password: 0, email: 0, _id: 0, createdAt: 0, updatedAt: 0, __v: 0 });
        res.status(200).send(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send({ message: "Internal server error" });
    }
});


userRouter.get("/thisUserInfo", authMiddleware, async (req: RequestWithUserId, res: Response) => {
    try {
        const user = await User.findById(req.userId, { password: 0 });
        res.status(200).send(user);
    } catch (err) {
        console.log("/thisUserInfo", err);
        res.status(500).send({ message: "Internal server error" });
    }
});

export default userRouter;
