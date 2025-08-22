import { Router } from "express";
import { createProduct, getProducts, getProductsById, patchProductStatus } from "../controller/productController.js";
import { validateSchema } from "../middleware/middlewareSchema.js"; 
import { productSchema, productUpdateStatusSchema } from "../schema/productSchema.js";
import { authUser } from "../middleware/middlewareAuth.js";
import { upload } from "../middleware/middlewareUploadImage.js";


const productRouter = Router();

productRouter.post('/create', authUser ,upload.single("image"),validateSchema(productSchema), createProduct);
productRouter.get('/filter', authUser, getProducts);
productRouter.get('/:id', authUser, getProductsById);
productRouter.patch('/:id', authUser,validateSchema(productUpdateStatusSchema),patchProductStatus);

export default productRouter;