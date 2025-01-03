import { Response, Router } from "express";
import { RequestWithUserId } from "./user.controller";
import User from "../model/user/user.model";
import { authMiddleware } from "../middleware/auth.middleware";

const chatRouter = Router();

chatRouter.get("/chats", authMiddleware, async (req: RequestWithUserId, res: Response) => {
      try {
            const users = await User.find();
            const filteredUsers = users.filter(user => user._id.toString() !== req.userId);
            res.status(200).send(filteredUsers)
      } catch(err) {
            console.log("/chat", err);
            res.status(500).send({message: "Internal server error"})
      }
})

export default chatRouter;