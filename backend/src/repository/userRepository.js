import prisma from "../database/database.connection.js";

export async function findUserByEmail(email) {
    return await prisma.user.findUnique({
        where: { email },
    });
}
export async function createUser(userData) {
    return await prisma.user.create({
        data: userData
    });
}
export async function findUserById(id) {
    return await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            imageUrl: true
        }
    });
}