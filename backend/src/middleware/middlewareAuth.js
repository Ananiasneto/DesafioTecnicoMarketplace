import jwt from "jsonwebtoken";
import { InvalidtokenError, UnauthorizedError } from "../error/erros.js";

export function authUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?authHeader.split(" ")[1]:null;
  if (!token) {
    throw new UnauthorizedError("Token not provided");
    
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new InvalidtokenError("Invalid token");
      
    }
     req.user = { id: decoded.id };
    next();
    
  });
}
