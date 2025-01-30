import { Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { RequestWithPayload } from "./user.controller";
import Friend from "../model/friend/friend.model";
import User from "../model/user/user.model";

const friendRouter = Router();

friendRouter.get("/all-friends", authMiddleware, async (req: RequestWithPayload, res: Response) => {
    try {
        const allFriends = await Friend.find({ $or: [{reciverId: req.userId}, {senderId: req.userId}]});

        const friendIds = allFriends.map(friend => {
            if(String(friend.reciverId) === req.userId) {
                return friend.senderId;
            } else if(String(friend.senderId) === req.userId) {
                return friend.reciverId;
            }
        })

        const users = await User.find({ _id: { $in: friendIds } }).select("username image");
        res.status(200).send(users);
    } catch (err) {
        console.log("all-friends -- get", err);
        res.status(500).send({ message: "Internal server error" });
    }
});

export default friendRouter;
