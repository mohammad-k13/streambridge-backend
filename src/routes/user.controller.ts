import { Request, Response, Router } from "express";
import User from "../model/user/user.model";
import { ExitStatus } from "typescript";
import { authMiddleware } from "../middleware/auth.middleware";

const userRouter = Router();

interface UserRequest extends Request {
  userId?: any;
}

userRouter.get("/users", authMiddleware, async (req: UserRequest, res: Response) => {
    try {
        console.log("userId", req.userId)
        // const users = await User.find();
        res.status(200).send([]);
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});

export default userRouter;