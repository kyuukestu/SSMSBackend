import express from 'express';
import * as registerController from '../Controllers/registerController.js';

const registerRouter = express.Router();

registerRouter.post('/', registerController.handleNewUser);

export default registerRouter;
