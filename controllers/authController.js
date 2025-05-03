import { StatusCodes } from "http-status-codes";
import Usuario from "../models/usuarioModel.js";
import { senhaHash, compararSenha } from "../utils/senhaUtils.js";
import { createJWT } from "../utils/tokenUtils.js"; 
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

    const token = createJWT({userId: usuario._id, nome: usuario.nome, isAdmin: usuario.isAdmin});
    
    const oneDAY = 1000 * 60 * 60 * 24;
    // Definindo o cookie com o token JWT

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDAY),
        secure: process.env.NODE_ENV === 'production', // Define como true se estiver em ambiente de produção
    });

    // Enviando os dados do usuário na resposta
    const usuarioResposta = {
        _id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        isAdmin: usuario.isAdmin
    };

    res.status(StatusCodes.OK).json({
        msg: 'Login realizado com sucesso!',
        usuario: usuarioResposta
    });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'Logout realizado com sucesso!' });
};