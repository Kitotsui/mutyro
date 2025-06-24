import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  // Verifica o token nos cookies no Authorization header
  const token =
    req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");

  console.log("Token recebido:", token); // debug

  if (!token) {
    console.log("Nenhum token encontrado");
    throw new UnauthenticatedError("Autenticação necessária");
  }

  try {
    //Verifica e decodifica o token
    const { userId, isAdmin } = verifyJWT(token);

    //Adiciona os dados do usuário na requisição
    req.user = {
      userId,
      isAdmin,
      token, // adiciona o token na requisição
    };

    console.log("Usuário autenticado:", { userId, isAdmin }); // debug
    next();
  } catch (error) {
    console.error("Falha na verificação do token:", error.message);
    throw new UnauthenticatedError("Token inválido ou expirado");
  }
};

export const authorizePermissions = () => {
  return (req, res, next) => {
    // Verifica se o middleware authenticateUser foi executado primeiro
    if (!req.user) {
      throw new UnauthenticatedError("Autenticação necessária");
    }

    if (!req.user.isAdmin) {
      console.log("Acesso negado para usuário não-admin:", req.user.userId);
      throw new UnauthorizedError("Acesso restrito a administradores");
    }

    console.log("Acesso admin concedido para:", req.user.userId);
    next();
  };
};

export const populateUserIfLoggedIn = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const { userId, nome, isAdmin } = verifyJWT(token);
      req.user = { userId, nome, isAdmin };
    } catch (error) {
      console.log("PopulateUser: Token inválido. Continuando como GUEST.");
    }
  }
  // Se não houver token ou se for inválida, req.user será undefined
  next();
};
