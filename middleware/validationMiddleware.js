import {body, validationResult} from 'express-validator';
import {BadRequestError} from '../errors/customErrors.js';
import Usuario from '../models/usuarioModel.js';
import Mutirao from '../models/mutiraoModel.js';

const withValidationErrors = (validateValues) =>{
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
};


export const validateCadastroInput = withValidationErrors([
    body('nome')
    .notEmpty()
    .withMessage('Nome é obrigatório!')
    .isLength({min: 3, max: 50})
    .withMessage('Nome tem que ter entre 3 e 50 caracteres!'),
    body('email')
    .notEmpty()
    .withMessage('Email é obrigatório!')
    .isEmail()
    .withMessage('Email inválido!').custom(async (email) => {
        const user = await Usuario.findOne({email});
        if(user) {
            throw new Error('Email já cadastrado!');
        }
    }),
    body('senha')
    .notEmpty()
    .withMessage('Senha é obrigatória!')
    .isLength({min: 6, max: 12})
    .withMessage('Senha tem que ter entre 6 e 12 caracteres!'),
    body('cpf')
    .notEmpty()
    .withMessage('CPF é obrigatório!')
    .isLength({min: 11, max: 11})
    .withMessage('CPF tem que ter 11 caracteres!')
]);

export const validateLoginInput = withValidationErrors([
    body('email')
    .notEmpty()
    .withMessage('Email é obrigatório!'),
    body('senha')
    .notEmpty()
    .withMessage('Senha é obrigatória!')
]);
