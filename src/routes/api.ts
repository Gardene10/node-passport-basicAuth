import { Router } from 'express';
import { Auth } from '../middlewares/auth';

import * as ApiController from '../controllers/apiController';
import { privateRoute } from '../config/passport';

const router = Router();

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);

router.get('/list',privateRoute, ApiController.list);

export default router;