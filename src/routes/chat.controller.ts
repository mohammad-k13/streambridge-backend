import { Response, Router } from "express";
import { RequestWithPayload } from "./user.controller";
import User from "../model/user/user.model";
import { authMiddleware } from "../middleware/auth.middleware";
import Message from "../model/message/message.model";

const chatRouter = Router();

chatRouter.get(
    "/chat-messages",
    authMiddleware,
    async (req: RequestWithPayload, res: Response) => {
        const { friendId } = req.query as { friendId: string };
        const userId = req.userId;

        if (!friendId) {
            res.status(400).send("body is incorrect");
            return;
        }

        try {
            const messages = await Message.find({
                $or: [
                    { senderId: userId, recieverId: friendId },
                    { senderId: friendId, recieverId: userId },
                ],
            }).sort({ createdAt: 1 });

            console.log("userId", userId);
            console.log("friendId", friendId);
            // console.log(messages)
            const sortedMessages = messages.map((message) => {
                console.log(String(message.senderId) === userId);
                return {
                    id: message._id.toString(),
                    text: message.message,
                    type: String(message.senderId) === userId ? "out_box" : "in_box",
                    createdAt: message.createdAt
                };
            });

            res.status(200).send(sortedMessages);
        } catch (err) {
            console.log("chat-messages -- get", err);
            res.status(500).send({ message: "Internal server error" });
        }
    }
);

export default chatRouter;
