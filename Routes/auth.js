import express from 'express';
import * as authController from '../Controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/', authController.handleLogin);

export default authRouter;
