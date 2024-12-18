import { Request, Response, Router } from "express";

const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;


  try {
  } catch (err) {}
});

export default authRouter;
