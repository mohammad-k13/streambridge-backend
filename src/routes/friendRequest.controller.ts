import { Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { RequestWithUserId } from "./user.controller";
import User from "../model/user/user.model";
import FriendRequest from "../model/friendRequest/friendRequest.model";
import { AllowedValues, allowedValues } from "../constants/staticValues";
import Notification from "../model/notification/notification.model";
import { ObjectId } from 'mongodb'

const friendRequestRouter = Router();

friendRequestRouter.post("/friend-request", authMiddleware, async (req: RequestWithUserId, res: Response) => {
    const { reciever_username } = req.body;

    if (!reciever_username) {
        res.status(400).send({ message: "Invalid body" });
        return;
    }

    try {
        const receiver_user = await User.findOne({ username: reciever_username });
        if (!receiver_user) {
            res.status(404).send({ message: "This user does not exist or deleted their account" });
            return;
        }

        if (receiver_user._id.toString() === req.userId) {
            res.status(400).send({ message: "You cannot send a friend request to yourself" });
            return;
        }

        const existingRequest = await FriendRequest.findOne({
            sender: req.userId,
            receiver: receiver_user._id,
        });

        if (existingRequest) {
            res.status(400).send({ message: "Friend request already sent" });
            return;
        }

        const friendRequest = await FriendRequest.create({
            senderId: req.userId,
            recieverId: receiver_user._id,
            status: "pending",
        });

        //create a notification for reciver
        await Notification.create({
            isReaded: false,
            type: "friend_request",
            userId: receiver_user._id,
        });

        res.status(200).send({ message: "Friend request sent", friendRequest });
    } catch (err) {
        console.log("/friend-request -- post", err);
        res.status(500).send({ message: "Internal error server" });
    }
});

friendRequestRouter.get("/all-friend-request", authMiddleware, async (req: RequestWithUserId, res: Response) => {
    try {
        const allRequests = await FriendRequest.aggregate([
            {
                $match: { recieverId: new ObjectId(req.userId) },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "senderId",
                    foreignField: "_id",
                    as: "senderInfo",
                },
            },
            {
                $unwind: "$senderInfo",
            },
            {
                $project: {
                    _id: 1,
                    status: 1,
                    senderInfo: {
                        image: 1,
                        username: 1
                    }
                },
            },
        ]);
        console.log(allRequests);
        res.status(200).send(allRequests);
    } catch (err) {
        console.log("/all-friend-request -- get", err);
        res.status(500).send({ message: "Internal server error" });
    }
});

export default friendRequestRouter;
