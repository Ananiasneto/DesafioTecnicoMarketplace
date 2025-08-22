import app from "./src/app.js";
import dotenv from "dotenv";
import userRouter from "./src/router/userRouter.js";
import productRouter from "./src/router/productRouter.js";
import { errorHandler } from "./src/error/errorHandler.js";


dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(userRouter);
app.use("/products", productRouter);


app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})
