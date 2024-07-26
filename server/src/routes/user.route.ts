import { Router } from 'express';
import { login, logout, signUp } from '../controllers/user.controller';
const router: Router = Router();

router.post('/login', login);
router.post('/signup', signUp);
router.post('/logout', logout);

export default router;
