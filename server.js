import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';

//Routers
import mutiraoRoute from './routes/mutiraoRoute.js';

//Middlewares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(morgan('dev'));
app.use(express.json());

app.get("/", (req, res) => {    
    res.send("Olá mundo!");
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.json({message: "Recebido!", data: req.body});
});

app.use('/api/v1/mutiroes', mutiraoRoute);

// Rotas de erro tem que vir depois das Rotas do CRUD
app.use('*', (req, res) => {
    res.status(404).json({error: 'Rota não encontrada!'});
});

app.use(errorHandlerMiddleware);


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

