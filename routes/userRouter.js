import {Router} from 'express';
import { getCurrentUser, updateUser, getApplicationStats } from '../controllers/userController.js';
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from '../middleware/authMiddleware.js';
const router = Router();

router.get('/atual-usuario', getCurrentUser);
router.get('/admin/app-estatistica',authorizePermissions(), getApplicationStats);
router.patch('/atualizar-usuario', validateUpdateUserInput, updateUser);


export default router;