import prisma from "../database/database.connection.js";

export async function createProductRepository(productData) {
    return await prisma.product.create({
        data: productData
    });
}
export async function getProductsByCategory(categoryName) {
  return await prisma.product.findMany({
    where: {
      category: {
        name: categoryName
      }
    },
    include: {
      category: true,
    }
  });
}
