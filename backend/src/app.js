import express from 'express';
import cors from 'cors';
import path from "path";
const app = express();
app.use(cors());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.json());


 
app.get('/health', (req, res) => {
    res.send('Hello, World!');
    }
);

export default app;