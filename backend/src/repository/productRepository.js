import prisma from "../database/database.connection.js";

export async function createProductRepository(productData) {
    return await prisma.product.create({
        data: productData
    });
}
export async function getProductsRepository(categoryName, status) {
  const productFilter = {};

  if (status && typeof status === 'string') {
    productFilter.status = status.toLowerCase();
  }

  if (categoryName && typeof categoryName === 'string') {
    const category = await prisma.category.findFirst({
      where: {
        name: { equals: categoryName, mode: "insensitive" }
      }
    });

    if (!category) {
      return [];
    }

    productFilter.categoryId = category.id;
  }
  return await prisma.product.findMany({
    where: productFilter,
    include: { category: true },
  });
}
export async function getProductsByIdRepository(id) {
    return await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: { category: true }
    });
}
export async function patchProductStatusRepository(productId, status) {
    const product = await prisma.product.update({
        where: { id: productId },
        data: { status }
    });
    return product;
}
export async function patchProductRepository(id, updateData) {
  return await prisma.product.update({
    where: { id: Number(id) },
    data: updateData,
  });
}