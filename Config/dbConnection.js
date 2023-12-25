import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
	} catch (err) {
		console.log(err);
	}
};

export default connectDB;
