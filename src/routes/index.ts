import { Router } from "express";
import userRouter from "./user.controller";
import authRouter from "./auth.controller";
import chatRouter from "./chat.controller";

const api = Router().use(userRouter).use(authRouter).use(chatRouter);
export default Router().use("/api", api);