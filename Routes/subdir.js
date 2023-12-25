import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const subdirRouter = express.Router();

subdirRouter.get('^/$|index(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'Views', 'subdir', 'index.html'));
});

export default subdirRouter;
