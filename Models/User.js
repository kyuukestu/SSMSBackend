import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	roles: {
		User: { type: Number, default: 100 },
		Staff: Number,
		Student: Number,
		Admin: Number,
	},
	password: {
		type: String,
		required: true,
	},
	usergroups: [
		{
			name: { type: String },
			groupID: { type: String },
		},
	],
	refreshToken: String,
});

export default mongoose.model('User', userSchema);
