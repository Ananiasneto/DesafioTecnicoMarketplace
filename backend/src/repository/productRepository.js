import prisma from "../database/database.connection.js";

export async function createProductRepository(productData) {
    return await prisma.product.create({
        data: productData
    });
}