import jwt from "jsonwebtoken";

export function authUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?authHeader.split(" ")[1]:null;
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    next();
  });
}
