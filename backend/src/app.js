import express from 'express';
const app = express();
app.use(cors());
app.use(express.json());


 
app.get('/health', (req, res) => {
    res.send('Hello, World!');
    }
);

export default app;