import { StatusCodes } from "http-status-codes";
import Usuario from "../models/usuarioModel.js";
import { senhaHash, compararSenha } from "../utils/senhaUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

//Lidando com o cadastro de usuários criando um novo usuário com os dados fornecidos no corpo da requisição.
export const cadastro = async (req, res) => {
  const primeiroCadastro = (await Usuario.countDocuments()) === 0;
  req.body.isAdmin = primeiroCadastro;

  //Criptografando a senha
  const senhaComHash = await senhaHash(req.body.senha);
  req.body.senha = senhaComHash;

  const user = await Usuario.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Usuário Cadastrado com sucesso!" });
};

//Lidando com o login de usuários
export const login = async (req, res) => {
  const usuario = await Usuario.findOne({ email: req.body.email });

  const usuarioValido =
    usuario && (await compararSenha(req.body.senha, usuario.senha));
  if (!usuarioValido)
    throw new UnauthenticatedError("Email ou senha incorretos!");

  const token = createJWT({
    userId: usuario._id,
    nome: usuario.nome,
    isAdmin: usuario.isAdmin,
  });

  const oneDAY = 1000 * 60 * 60 * 24;
  // Definindo o cookie com o token JWT

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDAY),
    secure: process.env.NODE_ENV === "production", // Define como true se estiver em ambiente de produção
  });

  // Enviando os dados do usuário na resposta
  const usuarioResposta = {
    _id: usuario._id,
    nome: usuario.nome,
    email: usuario.email,
    isAdmin: usuario.isAdmin,
    avatar: usuario.avatar,
  };

  res.status(StatusCodes.OK).json({
    msg: "Login realizado com sucesso!",
    token: token,
    usuario: usuarioResposta,
  });
};

export const googleCallback = async (req, res) => {
  try {
    // Verifica se o usuário já existe no banco de dados
    let usuario = await Usuario.findOne({ email: req.user.email });

    if (!usuario) {
      // Cria um novo usuário se ele não existir
      usuario = await Usuario.create({
        nome: req.user.displayName,
        email: req.user.email,
        senha: null, // Senha não é necessária para login via Google
      });
    }

    // Gera um token JWT
    const token = createJWT({
      userId: usuario._id,
      nome: usuario.nome,
      isAdmin: usuario.isAdmin,
    });

    const oneDAY = 1000 * 60 * 60 * 24;

    // Define o cookie com o token JWT
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDAY),
      secure: process.env.NODE_ENV === "production", // Use true em produção
    });

    // Redireciona para a página de usuário no frontend
    res.redirect("http://localhost:5173/user");
  } catch (error) {
    console.error("Erro ao processar autenticação via Google:", error);
    res.redirect("/"); // Redireciona para a página inicial em caso de erro
  }
};

// Configuração do Passport para autenticação com Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5100/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Verifica se o usuário já existe no banco de dados
        let usuario = await Usuario.findOne({ email: profile.emails[0].value });

        if (!usuario) {
          // Cria um novo usuário se ele não existir
          usuario = await Usuario.create({
            nome: profile.displayName,
            email: profile.emails[0].value,
            senha: null, // Senha não é necessária para login via Google
          });
        }

        return done(null, usuario);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  const usuario = await Usuario.findById(id);
  done(null, usuario);
});

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "Logout realizado com sucesso!" });
};
