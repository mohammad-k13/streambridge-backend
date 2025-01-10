import { Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { RequestWithUserId } from "./user.controller";

const friendRouter = Router();

friendRouter.get("/all-friends", authMiddleware, async (req: RequestWithUserId, res: Response) => {
    try {
    } catch (err) {}
});

export default friendRouter;
