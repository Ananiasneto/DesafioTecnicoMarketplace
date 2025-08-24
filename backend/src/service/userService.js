import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, findUserById } from "../repository/userRepository.js";
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from "../error/erros.js";

export async function signInService({ email, password }) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new  UnauthorizedError("Invalid password");
  }
  const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );
    return { 
      token 
    };

}

export async function signUpService({ email, password, name , phone , imageUrl }) {
  const user = await findUserByEmail(email);
  if (user) {
    throw new ConflictError(" Email already exists");
  }
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS)
  const hashedPassword =await bcrypt.hash(password, saltRounds);
  const newUser = {
    name,
    email,
    password: hashedPassword,
    phone: phone,
    imageUrl
  };
  const result=await createUser(newUser);
  if (!result) {
    throw new BadRequestError("Failed to create user");
  }
  return {
    message: "User created successfully",
    user: {
      id: result.id,
      name: result.name,
      email: result.email,
      phone: result.phone,
      imageUrl:result.imageUrl
    }
  };
}
export async function getUserService(userId) {
  const user = await findUserById(userId);
  if (!user) {
    throw new NotFoundError(" User not found");
  }
  return user;
}