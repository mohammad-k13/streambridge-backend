import { Response, Router } from "express";
import { RequestWithPayload } from "./user.controller";
import User from "../model/user/user.model";
import { authMiddleware } from "../middleware/auth.middleware";

const chatRouter = Router();

chatRouter.get("/chats", authMiddleware, async (req: RequestWithPayload, res: Response) => {
      try {
            const users = await User.find();
            const filteredUsers = users.filter(user => user._id.toString() !== req.userId);
            res.status(200).send(filteredUsers)
      } catch(err) {
            console.log("/chat", err);
            res.status(500).send({message: "Internal server error"})
      }
});

chatRouter.get("/messages", authMiddleware, async (req: RequestWithPayload, res: Response) => {
      try {
            
      } catch(err) {
            console.log("/chat/messages", err);
            res.status(500).send({message: "Internal Server Error"})
      }
})

export default chatRouter;