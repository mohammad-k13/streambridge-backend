import { Request, Response, Router } from "express";
import User from "../model/user/user.model";
import { compare } from "bcryptjs";
import Session from "../model/session/session.model";

const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({ message: "All information are Requirement" });
    return;
  }

  try {
    const user = await User.findOne({
      username,
      password,
    });
    if (!user) {
      res.status(404).send({ message: "user not found" });
    }

    const passwordMatch = await user?.comparePassword(password);
    if (passwordMatch) {
      res.status(404).send({ message: "username or password is wrong" });
    }

    const now = new Date();
    const expires = now.setHours(now.getHours() + 1);

    const session = await Session.create({
      sessionToken: user?.id,
      userId: user?.id,
      expires,
    });
    res.status(200).send({message: "logged In", sessionToken: session.sessionToken, expires: session.expires})
  } catch (err) {
    res.status(500).send({message: "Internal server error"})
  }
});

export default authRouter;
