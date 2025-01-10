import { Router } from "express";
import userRouter from "./user.controller";
import authRouter from "./auth.controller";
import chatRouter from "./chat.controller";
import friendRequestRouter from "./friendRequest.controller";
import friendRouter from "./friend.controller";

const api = Router().use(userRouter).use(authRouter).use(chatRouter).use(friendRequestRouter).use(friendRouter);
export default Router().use("/api", api);