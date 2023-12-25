import express from 'express';
import * as refreshTokenController from '../Controllers/refreshTokenController.js';

const refreshRouter = express.Router();

refreshRouter.get('/', refreshTokenController.handleRefreshToken);

export default refreshRouter;
