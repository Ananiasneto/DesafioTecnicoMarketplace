import { Router } from "express";
import { signIn, signUp } from "../controller/userController.js";
import { validateSchema } from "../middleware/middlewareSchema.js";
import { signInSchema, signUpSchema } from "../schema/userSchema.js";

const userRouter = Router();


userRouter.post('/sign-in',validateSchema(signInSchema),signIn);
userRouter.post('/sign-up',validateSchema(signUpSchema),signUp);


export default userRouter;