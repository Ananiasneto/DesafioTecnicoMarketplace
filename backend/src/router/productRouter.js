import { Router } from "express";
import { createProduct } from "../controller/productController.js";
import { validateSchema } from "../middleware/middlewareSchema.js"; 
import { productSchema } from "../schema/productSchema.js";
import { authUser } from "../middleware/middlewareAuth.js";
import { upload } from "../middleware/middlewareUploadImage.js";


const productRouter = Router();

productRouter.post('/create', authUser ,upload.single("image"),validateSchema(productSchema), createProduct);

export default productRouter;