import { Router } from "express";
import { getUser, signIn, signUp } from "../controller/userController.js";
import { validateSchema, validateSchemaWhitImage } from "../middleware/middlewareSchema.js";
import { signInSchema, signUpSchema } from "../schema/userSchema.js";
import { upload } from "../middleware/middlewareUploadImage.js";


const userRouter = Router();


userRouter.post('/sign-in',validateSchema(signInSchema),signIn);
userRouter.post('/sign-up',upload.single("image"),validateSchemaWhitImage(signUpSchema,"image"),signUp);
userRouter.get('/user/:id',getUser);


export default userRouter;