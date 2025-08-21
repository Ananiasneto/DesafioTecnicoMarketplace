import { Router } from "express";
import { signIn } from "../controller/userController.js";
import { validateSchema } from "../middleware/middlewareSchema.js";
import { signInSchema } from "../schema/userSchema.js";

const userRouter = Router();


userRouter.post('/sign-in',validateSchema(signInSchema),signIn)


export default userRouter;