import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import productRoutes from './routes/product.js';
import cors from 'cors';


dotenv.config();


const app = express();

// Base de Datos
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB conectada'))
    .catch((err) => clg('DB con error', err));


// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// Router middleware
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);


const port = process.env.PORT || 8000


app.listen(port, () => {
    console.log(`El servidor corre en el puerto ${port}`)
});