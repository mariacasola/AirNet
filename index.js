import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
/*
--usare import para node y react, se añade type:module en el package.json
const express = require('express');
*/

const app = express();

// Base de Datos
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB conectada'))
    .catch((err) => clg('DB con error', err));


app.get('/usuarios', (req, res) => {
    res.json({
        data: 'Majo Casola de Airnet Moreno Arg'
    })
});

const port = process.env.PORT || 8000



app.listen(port, () => {
    console.log(`El servidor corre en el puerto ${port}`)
});