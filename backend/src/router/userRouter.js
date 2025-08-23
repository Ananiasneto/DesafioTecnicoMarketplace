import { Router } from "express";
import { signIn, signUp } from "../controller/userController.js";
import { validateSchema, validateSchemaWhitImage } from "../middleware/middlewareSchema.js";
import { signInSchema, signUpSchema } from "../schema/userSchema.js";
import { upload } from "../middleware/middlewareUploadImage.js";


const userRouter = Router();


userRouter.post('/sign-in',validateSchema(signInSchema),signIn);
userRouter.post('/sign-up',upload.single("image"),validateSchemaWhitImage(signUpSchema,"image"),signUp);


export default userRouter;