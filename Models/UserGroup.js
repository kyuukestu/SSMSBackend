import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userGroupSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	calendarID: {
		type: String,
		required: true,
	},
	members: [
		{
			name: { type: String },
			userID: { type: String },
		},
	],
});

export default mongoose.model('UserGroup', userGroupSchema);
