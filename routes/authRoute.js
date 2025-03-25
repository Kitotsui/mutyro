import {Router} from 'express';
import {login, cadastro} from '../controllers/authController.js';
import { validateCadastroInput, validateLoginInput } from '../middleware/validationMiddleware.js';
const router = Router();

router.post('/cadastro', validateCadastroInput, cadastro);
router.post('/login', validateLoginInput, login);


export default router;