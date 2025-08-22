import prisma from "../database/database.connection.js";

export function createCategory(categoryName) {
  return prisma.category.create({
    data: {
      name: categoryName,
    },
  });
}
export function checkCategoryExists(categoryName) {
  return prisma.category.findUnique({
    where: {
      name: categoryName,
    },
  });
}