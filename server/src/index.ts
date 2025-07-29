
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth-routes';
import productRoutes from './routes/product-routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/api', (req, res)=>{
    res.status(200).json({message: 'api is running...'})
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`server is listening on port: ${PORT}....`))