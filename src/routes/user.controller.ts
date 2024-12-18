import { Request, Response, Router } from "express";

const userRouter = Router();

userRouter.post("/users", async (req: Request, res: Response) => {
  const {email , password, username} = req.body;
})

export default userRouter;