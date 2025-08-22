import { createProductService } from '../service/productService.js';
import { getProductsByCategoryService } from '../service/productService.js';

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

export async function getProductsByCategory(req, res) {
    const { category } = req.query;
    try {
        const products = await getProductsByCategoryService(category);
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error during get products by category:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}