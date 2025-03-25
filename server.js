import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
  

//Routers
import mutiraoRoute from './routes/mutiraoRoute.js';
import authRoute from './routes/authRoute.js';

//Middlewares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

//Configurações
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(morgan('dev'));
app.use(express.json());

app.get("/", (req, res) => {    
    res.send("Olá mundo!");
});

//Rotas
app.use('/api/v1/mutiroes', mutiraoRoute);
app.use('/api/v1/auth', authRoute);

// Rotas de erro tem que vir depois das Rotas do CRUD
app.use('*', (req, res) => {
    res.status(404).json({error: 'Rota não encontrada!'});
});

//Middleware de erro
app.use(errorHandlerMiddleware);

//Conexão com o banco de dados
const port = process.env.PORT || 5100;
try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}....`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

