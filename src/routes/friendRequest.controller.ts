import { Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { RequestWithPayload } from "./user.controller";
import User from "../model/user/user.model";
import FriendRequest from "../model/friendRequest/friendRequest.model";
import { AllowedValues, allowedValues, FriendRequestStatus } from "../constants/staticValues";
import Notification from "../model/notification/notification.model";
import { ObjectId } from "mongodb";
import Friend from "../model/friend/friend.model";
import friendRequestNotification from "../services/notification/friendRequestNotification";

const friendRequestRouter = Router();

friendRequestRouter.post(
    "/friend-request",
    authMiddleware,
    async (req: RequestWithPayload, res: Response) => {
        const { reciever_username } = req.body;

        if (!reciever_username) {
            res.status(400).send({ message: "Invalid body" });
            return;
        }

        try {
            const receiver_user = await User.findOne({ username: reciever_username });
            if (!receiver_user) {
                res.status(404).send({
                    message: "This user does not exist or deleted their account",
                });
                return;
            }

            if (receiver_user._id.toString() === req.userId) {
                res.status(400).send({
                    message: "You cannot send a friend request to yourself",
                });
                return;
            }

            // Check if the sender and receiver are already friends
            const existingFriendship = await Friend.findOne({
                $or: [
                    { userId: req.userId, friendId: receiver_user._id },
                    { userId: receiver_user._id, friendId: req.userId },
                ],
            });

            if (existingFriendship) {
                res.status(400).send({ message: "You are already friends with this user" });
                return;
            }

            const existingRequest = await FriendRequest.findOne({
                senderId: req.userId,
                recieverId: receiver_user._id,
                status: { $in: ["pending", "rejected"] },
            });

            if (existingRequest) {
                res.status(400).send({ message: "Friend request already sent" });
                return;
            }

            const friendRequest = await FriendRequest.create({
                senderId: req.userId,
                recieverId: receiver_user._id,
            });

            // Create a notification for receiver
            await Notification.create({
                isReaded: false,
                type: "friend_request",
                userId: receiver_user._id,
            });

            // Sending notification
            await friendRequestNotification(
                req.io!,
                receiver_user._id.toString(),
                "friend_request",
                {
                    image: receiver_user.image ?? "",
                    username: receiver_user.username,
                    createAt: friendRequest.createAt,
                }
            );

            res.status(200).send({ message: "Friend request sent", friendRequest });
        } catch (err) {
            console.log("/friend-request -- post", err);
            res.status(500).send({ message: "Internal error server" });
        }
    }
);
friendRequestRouter.get(
    "/all-friend-request",
    authMiddleware,
    async (req: RequestWithPayload, res: Response) => {
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
                        createdAt: 1,
                        senderInfo: {
                            image: 1,
                            username: 1,
                        },
                    },
                },
            ]);
            res.status(200).send(allRequests);
        } catch (err) {
            console.log("/all-friend-request -- get", err);
            res.status(500).send({ message: "Internal server error" });
        }
    }
);

friendRequestRouter.post(
    "/answer-to-request",
    authMiddleware,
    async (req: RequestWithPayload, res: Response) => {
        const { newStatus, request_id } = req.body as {
            newStatus: FriendRequestStatus;
            request_id: string;
        };

        if (!newStatus) {
            res.status(404).send({ message: "Invalid Body" });
            return;
        }

        try {
            const targetRequest = await FriendRequest.findById(request_id);
            if (!targetRequest) {
                res.status(404).send({ message: "This Request Not Found" });
                return;
            }

            const sender_user = await User.findById(targetRequest.senderId);
            if (!sender_user) {
                res.status(404).send({ message: "Sender of this request was deleted!" });
                return;
            }

            if (newStatus === "rejected") {
                await FriendRequest.findOneAndUpdate(
                    { _id: request_id },
                    { status: newStatus }
                );

                await friendRequestNotification(
                    req.io!,
                    sender_user._id.toString(),
                    "friend_request_rejected"
                );
                res.status(200).send({ message: "Request Rejected" });
            } else {
                await FriendRequest.findByIdAndUpdate(
                    { _id: request_id },
                    { status: newStatus }
                );
                await Friend.create({ reciverId: req.userId, senderId: sender_user._id });

                await friendRequestNotification(
                    req.io!,
                    sender_user._id.toString(),
                    "friend_request_accepted"
                );
                res.status(200).send({ message: "Request Accepted" });
            }
        } catch (err) {
            console.log("/answer-to-request -- post", err);
            res.status(500).send({ message: "Internal server error" });
        }
    }
);

export default friendRequestRouter;
