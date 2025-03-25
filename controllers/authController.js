import { StatusCodes } from "http-status-codes";
import Usuario from "../models/usuarioModel.js";
import { senhaHash, compararSenha } from "../utils/senhaUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";


 //Lidando com o cadastro de usuários criando um novo usuário com os dados fornecidos no corpo da requisição.
export const cadastro = async (req, res) => {
    const primeiroCadastro = await Usuario.countDocuments() === 0;
    req.body.isAdmin = primeiroCadastro;

    //Criptografando a senha
    const senhaComHash = await senhaHash(req.body.senha);
    req.body.senha = senhaComHash;

    const user = await Usuario.create(req.body);
    res.status(StatusCodes.CREATED).json({msg: 'Usuário Cadastrado com sucesso!'});
};



//Lidando com o login de usuários
export const login = async (req, res) => {
    const usuario = await Usuario.findOne({email: req.body.email});

    const usuarioValido = usuario && (await compararSenha(req.body.senha, usuario.senha));
    if(!usuarioValido) throw new UnauthenticatedError('Email ou senha incorretos!');

    res.send("Login");
};