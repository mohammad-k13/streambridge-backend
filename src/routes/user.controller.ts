import { Request, Response, Router } from "express";
import User from "../model/user/user.model";
import { ExitStatus } from "typescript";

const userRouter = Router();

userRouter.post("/users", async (req: Request, res: Response) => {
  const {email , password, username} = req.body;

  if(!email || !password || !username) {
    res.status(400).send({message: "All information are required"})
    return
  }

  try {
    const existingUser = await User.findOne({email});
    if(existingUser) {
      res.status(409).send({message: "this email is taken"})
      return;
    }

    const user = await User.create({email, password, username})
    res.status(200).send({message: "user created!", user})
  } catch(err) {
    res.status(500).send({message: "Internal server error"})
  }

})

export default userRouter;