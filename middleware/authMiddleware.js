import { UnauthenticatedError, UnauthorizedError} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  console.log(req.cookies);

  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Autenticação inválida00!"); //se o cookie nao estiver presente
  
    //verifica se o token é válido, envia os dados do usuário (id e tipo)
    try {
        const { userId, isAdmin } = verifyJWT(token); 
        req.user = { userId, isAdmin };
        next(); // chama o próximo middleware - mutiraocontroller
    } catch (error) {
      throw new UnauthenticatedError("Autenticação inválida01!"); //se o jwt nao for valido
    } 
};

export const authorizePermissions = () => {
  return (req, res, next) => {
    if (!req.user.isAdmin) { //se o usuario não for admin
      throw new UnauthorizedError("Requerido admin para acessar esta rota!");
    }
    next();
  };
};