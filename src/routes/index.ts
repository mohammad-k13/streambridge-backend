import { Router } from "express";
import userRouter from "./user.controller";
import authRouter from "./auth.controller";

const api = Router().use(userRouter).use(authRouter);
export default Router().use("/api", api);