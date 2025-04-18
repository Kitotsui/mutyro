import { StatusCodes } from 'http-status-codes';
import Mutirao from '../models/mutiraoModel.js';

export const getMutiroes = async (req, res) => {
    //console.log(req.user);
    const mutiroes = await Mutirao.find({criadoPor: req.user.userId}); // Busca todos os mutirões do usuário logado
    res.status(StatusCodes.OK).json({mutiroes});
}

export const createMutirao = async (req, res) => {
    req.body.criadoPor = req.user.userId; // Adiciona o id do usuário logado ao mutirão
    const mutirao = await Mutirao.create(req.body ); // Criar um novo mutirão utilizando o modelo Mutirao do models
    res.status(StatusCodes.CREATED).json({ mutirao });
    console.log("Mutirão criado com sucesso!");
}


export const getMutirao = async (req, res) => {
    const {id} = req.params;
    const mutirao = await Mutirao.findById(id);

    res.status(StatusCodes.OK).json({ mutirao });
}

export const updateMutirao = async (req, res) => {
    const {id} = req.params;
    const updatedMutirao = await Mutirao.findByIdAndUpdate(id, req.body, {
        new: true,
    });

    res.status(StatusCodes.OK).json("Mutirão atualizado com sucesso!");
}

export const deleteMutirao = async (req, res) => {
    const {id} = req.params;
    const removedMutirao = await Mutirao.findByIdAndDelete(id);

    res.status(StatusCodes.OK).json({message: "Mutirão deletado com sucesso!"});
}


