import app from "./src/app.js";
import dotenv from "dotenv";
import userRouter from "./src/router/userRouter.js";


dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(userRouter);



app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})
