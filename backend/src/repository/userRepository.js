import prisma from "../database/database.connection.js";

export async function findUserByEmail(email) {
    return await prisma.user.findUnique({
        where: { email },
    });
}