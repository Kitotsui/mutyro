import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import Usuario from "../models/usuarioModel.js";
import { MUTIRAO_TIPOS } from "../utils/constantes.js";
import mongoose from "mongoose";
import Mutirao from "../models/mutiraoModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      console.log("Dados recebidos no middleware:", req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Erros de validação:", errors.array());
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("Nenhum")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("Você não tem")) {
          throw new UnauthorizedError(
            "Você não tem permissão para acessar essa rota!"
          );
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateCadastroInput = withValidationErrors([
  body("nome")
    .notEmpty()
    .withMessage("Nome é obrigatório!")
    .isLength({ min: 3, max: 50 })
    .withMessage("Nome tem que ter entre 3 e 50 caracteres!"),
  body("email")
    .notEmpty()
    .withMessage("Email é obrigatório!")
    .isEmail()
    .withMessage("Email inválido!")
    .custom(async (email) => {
      const user = await Usuario.findOne({ email });
      if (user) {
        throw new Error("Email já cadastrado!");
      }
    }),
  body("senha")
    .notEmpty()
    .withMessage("Senha é obrigatória!")
    .isLength({ min: 6, max: 12 })
    .withMessage("Senha tem que ter entre 6 e 12 caracteres!"),
  // Temporariamente removendo validação do CPF para teste
  // body("cpf")
  //   .notEmpty()
  //   .withMessage("CPF é obrigatório!")
  //   .isLength({ min: 11, max: 11 })
  //   .withMessage("CPF tem que ter 11 caracteres!"),
]);

export const validateLoginInput = withValidationErrors([
  body("email").notEmpty().withMessage("Email é obrigatório!"),
  body("senha").notEmpty().withMessage("Senha é obrigatória!"),
]);

export const validateMutiraoInput = withValidationErrors([
  body("titulo").notEmpty().withMessage("Título é obrigatório!"),
  body("data").notEmpty().withMessage("Data é obrigatória!"),
  body("descricao").notEmpty().withMessage("Descrição é obrigatório!"),
  body("local").notEmpty().withMessage("Local é obrigatório!"),
  body("mutiraoTipo")
    .trim()
    .toUpperCase()
    .isIn(Object.values(MUTIRAO_TIPOS))
    .withMessage("Tipo do mutirao invalido!")
    .customSanitizer((value) => {
      // Remove barras se existirem
      return value.replace(/\//g, "_");
    }),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalido MongoDB id");

    const mutirao = await Mutirao.findOne({
      _id: value,
      ativo: true, // Só permite operações em mutirões ativos
    });
    if (!mutirao) throw new NotFoundError(`Nenhum mutirão com Id ${value}`);

    // const isAdmin = req.user.role === 'admin'; //verifica se o usuário é admin
    // const ehOwner = req.user.userId === mutirao.criadoPor.toString(); //verifica se o usuário é o dono do mutirão

    // if (!isAdmin && !ehOwner) throw new UnauthorizedError('Você não tem permissão para acessar essa rota!');
  }),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("nome")
    .notEmpty()
    .withMessage("Nome é obrigatório!")
    .isLength({ min: 3, max: 50 })
    .withMessage("Nome deve ter entre 3 e 50 caracteres!"),
  body("email")
    .notEmpty()
    .withMessage("Email é obrigatório!")
    .isLength({ min: 3, max: 100 })
    .withMessage("Email deve ter entre 3 e 100 caracteres!"),
  body("endereco")
    .notEmpty()
    .withMessage("Endereço é obrigatório!")
    .isLength({ min: 5, max: 100 })
    .withMessage("Endereço deve ter entre 5 e 100 caracteres!"),
  body("cpf")
    .notEmpty()
    .withMessage("CPF é obrigatório!")
    .isLength({ min: 11, max: 11 })
    .withMessage("CPF deve ter 11 caracteres!")
    .matches(/^\d{11}$/)
    .withMessage("CPF deve conter apenas números!"),
  body("dataNascimento")
    .notEmpty()
    .withMessage("Data de nascimento é obrigatória!")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Data de nascimento deve estar no formato YYYY-MM-DD!")
    .custom((value) => {
      const date = new Date(value + "T00:00:00Z");
      const hoje = new Date();
      if (isNaN(date.getTime())) {
        throw new Error("Data de nascimento inválida!");
      }
      if (date > hoje) {
        throw new Error("Data de nascimento não pode ser no futuro!");
      }
      return true;
    }),
]);
