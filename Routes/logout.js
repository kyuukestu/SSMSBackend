import express from 'express';
import * as logoutController from '../Controllers/logoutController.js';

const logoutRouter = express.Router();

logoutRouter.get('/', logoutController.handleLogout);

export default logoutRouter;
