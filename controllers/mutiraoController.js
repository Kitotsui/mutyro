import { nanoid } from 'nanoid';

let mutiroes = [
    {id: nanoid(), nome: "Mutirão de limpeza", data: "2021-09-01", local: "Praça central"},
    {id: nanoid(), nome: "Mutirão de pintura", data: "2021-09-02", local: "Escola municipal"},
]

export const getMutiroes = (req, res) => {
    res.status(200).json({mutiroes});
}

export const createMutirao = async (req, res) => {
    const {nome, data, local} = req.body;
    const mutirao = {id: nanoid(10), nome, data, local};
    if(!nome || !data || !local) {
        return res.status(400).json({error: "Informe nome, data e local do mutirão!"});
    }
    mutiroes.push(mutirao);
    res.status(201).json({mutirao});
}

export const getMutirao = async (req, res) => {
    const {id} = req.params;
    const mutirao = mutiroes.find((mutirao) => mutirao.id === id);
    if(!mutirao) {
        return res.status(404).json({error: "Mutirão não encontrado!"});
    }
    res.status(200).json({mutirao});
}

export const updateMutirao = async (req, res) => {
    const {id} = req.params;
    const {nome, data, local} = req.body;
    const mutirao = mutiroes.find((mutirao) => mutirao.id === id);
    if(!mutirao) {
        return res.status(404).json({error: "Mutirão não encontrado!"});
    }
    mutirao.nome = nome;
    mutirao.data = data;
    mutirao.local = local;
    res.status(200).json({mutirao});
}

export const deleteMutirao = async (req, res) => {
    const {id} = req.params;
    mutiroes = mutiroes.filter((mutirao) => mutirao.id !== id);
    res.status(200).json({message: "Mutirão deletado com sucesso!"});
}


