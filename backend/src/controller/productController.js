import { createProductService, getProductsByIdService, patchProductService, patchProductStatusService } from '../service/productService.js';
import { getProductsService } from '../service/productService.js';

export async function createProduct(req, res) {
    const { title, description, price, category } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const userId = req.user.id;
    try {
        const product = await createProductService({ title, description, price, imageUrl, category , userId });
        return res.status(201).json(product);
    } catch (error) {
        console.error('Error during create product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }   
}

export async function getProducts(req, res) {
    const { category ,status} = req.query;
    try {
        const products = await getProductsService( category, status );
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error during get products by category:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getProductsById(req, res) {
    const {id} = req.params;
    try {
        const product = await getProductsByIdService(id);
        return res.status(200).json(product);
    } catch (error) {
        if (error.message === "Product not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error('Error during get products by category:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export async function patchProductStatus(req, res) {
    const {id} = req.params;
    const {status} = req.body;
    try {
        const product = await getProductsByIdService(id);
        const productStatusUpdate=await patchProductStatusService(product.id,status);

        return res.status(200).json(productStatusUpdate);
    } catch (error) {
        if (error.message === "Product not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error('Error during pacht products status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export async function patchProduct(req, res) {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProduct = await patchProductService(id, updates);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}
