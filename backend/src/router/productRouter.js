import { Router } from "express";
import { createProduct, getProducts, getProductsById, patchProduct, patchProductStatus } from "../controller/productController.js";
import { validateSchema, validateSchemaWhitImage } from "../middleware/middlewareSchema.js"; 
import { productSchema, productUpdateSchema, productUpdateStatusSchema } from "../schema/productSchema.js";
import { authUser } from "../middleware/middlewareAuth.js";
import { upload } from "../middleware/middlewareUploadImage.js";


const productRouter = Router();

productRouter.post('/create', authUser ,upload.single("image"),validateSchemaWhitImage(productSchema,"image"), createProduct);
productRouter.get('/filter', authUser, getProducts);
productRouter.get('/:id', authUser, getProductsById);
productRouter.patch('/Update:id', authUser,validateSchema(productUpdateSchema),patchProduct);
productRouter.patch('/:id', authUser,validateSchema(productUpdateStatusSchema),patchProductStatus);

export default productRouter;