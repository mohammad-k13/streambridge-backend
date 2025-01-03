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
        const users = await User.find({}, {password: 0, email: 0, });
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});

export default userRouter;