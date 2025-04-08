import {Router} from 'express';
import {login, cadastro, logout} from '../controllers/authController.js';
import { validateCadastroInput, validateLoginInput } from '../middleware/validationMiddleware.js';
const router = Router();

router.post('/cadastro', validateCadastroInput, cadastro);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);


export default router;