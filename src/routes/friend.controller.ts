import { Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { RequestWithPayload } from "./user.controller";
import Friend from "../model/friend/friend.model";
import User from "../model/user/user.model";

const friendRouter = Router();

friendRouter.get("/all-friends", authMiddleware, async (req: RequestWithPayload, res: Response) => {
    console.log(req.userId);
    try {
        const allFriends = await Friend.find({ reciverId: req.userId });
        const friendIds = allFriends.map((friend) => friend.senderId);

        const users = await User.find({ _id: { $in: friendIds } }).select("username image");
        res.status(200).send(users);
    } catch (err) {
        console.log("all-friends -- get", err);
        res.status(500).send({ message: "Internal server error" });
    }
});

export default friendRouter;
