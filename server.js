import 'express-async-errors'; //trata os erros dassincronos e passa para o middleware de erro
import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from "cors";

//Swagger
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig.js";

//Routers
import mutiraoRoute from './routes/mutiraoRoute.js';
import authRoute from './routes/authRoute.js';
import userRouter from "./routes/userRouter.js";

//Middlewares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import {authenticateUser} from './middleware/authMiddleware.js';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({
  origin: 'http://localhost:5173', // URL do seu frontend
  credentials: true, // Permite enviar cookies
}));

// Arquivo estático para uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Configurações
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {    
    res.send("Olá mundo!");
});

//teste proxy
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

//Rotas
app.use('/api/v1/mutiroes', authenticateUser, mutiraoRoute);
app.use('/api/v1/usuarios', authenticateUser, userRouter);
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

//MONGO_URL=mongodb+srv://Rogerio:password@cluster0.7p5tr.mongodb.net/Mutyro?retryWrites=true&w=majority&appName=Cluster0

//MONGO_URL=mongodb+srv://joaohenriquelamounier:125491jh@cluster1.g7wlbab.mongodb.net/MUTYRO?retryWrites=true&w=majority&appName=Cluster1