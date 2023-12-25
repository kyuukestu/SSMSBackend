import path from 'path';
import { logger } from './Middleware/logEvents.js';
import errorHandler from './Middleware/errorHandler.js';

import verifyJWT from './Middleware/verifyJWT.js';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import corsOptions from './Config/corsOptions.js';
import credentials from './Middleware/credentials.js';
import mongoose from 'mongoose';
import connectDB from './Config/dbConnection.js';

import * as dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url';

const app = express();
const PORT = dotenv.PORT || 5174; // Vite uses Port 5174
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Connect to MongoDB
connectDB();

// Log requests
app.use(logger);

// Handle options credentials check – before CORS
// Fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));

// Middleware for Json
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, '/public')));

import rootRouter from './Routes/root.js';
import employeeRouter from './Routes/Api/employees.js';
import registerRouter from './Routes/register.js';
import authRouter from './Routes/auth.js';
import refreshRouter from './Routes/refresh.js';
import logoutRouter from './Routes/logout.js';
import usergroupRouter from './Routes/Api/usergroups.js';
import userRouter from './Routes/Api/users.js';

// Routes
app.use('/', rootRouter);
app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);

// app.use(verifyJWT);
app.use('/employees', employeeRouter);
app.use('/usergroups', usergroupRouter);
app.use('/users', userRouter);

app.all('*', (req, res) => {
	res.status(404);
	if (req.accepts('html')) {
		res.sendFile('./Views/404.html', { root: __dirname });
	} else if (req.accepts('json')) {
		res.json({ error: '404 Not Found' });
	} else {
		res.type('txt').send('404 Not Found');
	}
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
