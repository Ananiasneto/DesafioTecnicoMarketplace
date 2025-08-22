import { checkCategoryExists, createCategory } from "../repository/categoryRepository.js";
import { createProductRepository } from "../repository/productRepository.js";
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
        throw new Error("Failed to create product");
    }
    const user= await findUserById(userId);
    
    return {
        message: "Product created successfully",
        product: {
        id: result.id,
        title: result.title,
        description: result.description,
        price: result.price,
        imageUrl: result.imageUrl
        
        },user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}