import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootRouter = express.Router();

rootRouter.get('^/$|index(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'Views', 'index.html'));
});
rootRouter.get('/new-page(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'Views', 'new-page.html'));
});
rootRouter.get('/old-page(.html)?', (req, res) => {
	res.redirect(301, '/new-page.html');
});

export default rootRouter;
