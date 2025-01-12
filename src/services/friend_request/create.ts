import mongoose from "mongoose";
import User from "../../model/user/user.model";
import FriendRequest from "../../model/friendRequest/friendRequest.model";
import Notification from "../../model/notification/notification.model";

export default async function CreateFriendRequest(
    reciever_username: string,
    senderId: string
) {
    try {
        const receiver_user = await User.findOne({ username: reciever_username });
        if (!receiver_user) {
            // res.status(404).send({ message: "This user does not exist or deleted their account" });
            return;
        }

        if (receiver_user._id.toString() === senderId) {
            // res.status(400).send({ message: "You cannot send a friend request to yourself" });
            return;
        }

        const existingRequest = await FriendRequest.findOne({
            sender: senderId,
            receiver: receiver_user._id,
        });

        if (existingRequest) {
            // res.status(400).send({ message: "Friend request already sent" });
            return;
        }

        const friendRequest = await FriendRequest.create({
            senderId: senderId,
            recieverId: receiver_user._id,
            status: "pending",
        });

        //create a notification for reciver
        await Notification.create({
            isReaded: false,
            type: "friend_request",
            userId: receiver_user._id,
        });

        //   res.status(200).send({ message: "Friend request sent", friendRequest });
    } catch (err) {
        console.log("friend request creation faild", err);
    }
}
