import { BadRequestError, NotFoundError, uniprocessableEntityError } from "../error/erros.js";
import { checkCategoryExists, createCategory } from "../repository/categoryRepository.js";
import { createProductRepository, getAllProductsRepository, getProductsByIdRepository, getProductsRepository, patchProductRepository, patchProductStatusRepository} from "../repository/productRepository.js";
import { findUserById } from "../repository/userRepository.js";

export async function createProductService({ title, description, price, imageUrl, category,userId }) {
    let categoryExists = await checkCategoryExists(category);
    if (!categoryExists) {
         categoryExists=await createCategory(category);
    }
    const productData = {
        title,
        description,
        price,
        imageUrl,
        status: "announced" ,
        categoryId: categoryExists.id,
        userId
    };
    
    const result = await createProductRepository(productData);
    if (!result) {
        throw new BadRequestError("Failed to create product");
    }
    const user= await findUserById(userId);
    
    return {
        message: "Product created successfully",
        product: {
        id: result.id,
        title: result.title,
        description: result.description,
        price: result.price,
        imageUrl: result.imageUrl,
        category: categoryExists.name
        },user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}

export async function getProductsService(category, status) {
    const products = await getProductsRepository(category, status);
    if (!products || products.length === 0) {
        return [];
    }
    
    return products.map(product => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        status: product.status,
        category: category
    }));
}
export async function getAllProductsService() {
    const products = await getAllProductsRepository();
    return products;

}
export async function getProductsByIdService(id) {
    const product = await getProductsByIdRepository(id);
    if (!product || product.length === 0) {
        throw new NotFoundError("Product not found");
    }
    
    return product;
}
export async function patchProductStatusService(productId, status) {
    const updatedProduct = await patchProductStatusRepository(productId, status);
    return updatedProduct;
}

export async function patchProductService(id, updates) {
    const allowedFields = ["title", "description", "price", "status", "imageUrl"];
    const updateData = {};

  for (const key of Object.keys(updates)) {
    if (allowedFields.includes(key)) {
      updateData[key] = updates[key];
    }
  }

  if (Object.keys(updateData).length === 0) {
    throw uniprocessableEntityError("No valid fields to update");
  }
    const updatedProduct = await patchProductRepository(id, updateData);
    if (!updatedProduct) {
        throw new BadRequestError("Failed to update product");
    }
    
    return updatedProduct;
}
export async function deleteProductService(id) {
    const product = await getProductsByIdRepository(id);
    if (!product) {
        throw new NotFoundError("Product not found");
    }
    
    const deletedProduct = await prisma.product.delete({
        where: { id: parseInt(id) }
    });
    
    return deletedProduct;
}
