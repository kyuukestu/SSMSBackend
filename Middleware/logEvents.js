import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const logEvents = async (message, logName) => {
	const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
	const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

	try {
		if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
			await fs.mkdir(path.join(__dirname, '..', 'logs'), (err) => {
				if (err) {
					return console.error(err);
				}
				console.log('Directory created successfully!');
			});
		}

		await fs.appendFile(
			path.join(__dirname, '..', 'logs', logName),
			logItem,
			(err) => {
				if (err) {
					return console.error(err);
				}
				console.log('File created successfully!');
			}
		);
	} catch (err) {
		console.log(err);
	}
};

const logger = (req, res, next) => {
	logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
	console.log(`${req.method} ${req.path}`);
	next();
};

export { logEvents, logger };
