import UserGroup from '../Models/UserGroup.js';

const getAllUserGroups = async (req, res) => {
	const usergroups = await UserGroup.find();
	if (!usergroups)
		return res.status(204).json({ message: 'No user groups found.' });
	res.json(usergroups);
};

const createNewUserGroup = async (req, res) => {
	if (!req?.body?.name || !req?.body?.calendarID || !req?.body?.members) {
		return res
			.status(400)
			.json({ message: 'Name, CalendarID, and Members required!' });
	}

	try {
		const result = await UserGroup.create({
			name: req.body.name,
			calendarID: req.body.calendarID,
			members: [...req.body.members],
		});

		res.status(201).json(result);
	} catch (err) {
		console.log(err);
	}
};

const updateUserGroup = async (req, res) => {
	if (!req?.body?.id) {
		return res.status(400).json({ message: 'Calendar ID is required!' });
	}

	const usergroup = await UserGroup.findOne({
		_id: req.body.id,
	}).exec();

	if (!usergroup) {
		return res
			.status(400)
			.json({ message: `No User Group ID matches ${req.body.id}` });
	}
	if (req.body?.name) usergroup.name = req.body.name;
	if (req.body?.calendarID) usergroup.calendarID = req.body.calendarID;
	if (req.body?.members) usergroup.members = req.body.members;

	const result = await usergroup.save();

	res.json(result);
};

const deleteUserGroup = async (req, res) => {
	if (!req?.body?.id)
		return res.status(400).json({ message: 'User Group ID required! ' });

	const usergoup = await UserGroup.findOne({ _id: req.body.id });
	if (!usergroup) {
		return res.status(400).json({ message: `No ID matches ${req.body.id}` });
	}
	const result = await usergroup.deleteOne({ _id: req.body.id });
	res.json(result);
};

const getUserGroup = async (req, res) => {
	if (!req?.params?.id)
		return res.status(400).jason({
			message: 'User Group ID required.',
		});

	const usergroup = await UserGroup.findOne({ _id: req.params.id }).exec();
	if (!usergroup) {
		return res
			.status(204)
			.json({ message: `No user group ID matches ${req.params.id}` });
	}
	res.json(usergroup);
};

const addGroupMember = async (req, res) => {
	if (!req?.body?.id || !req?.body?.members)
		return res.status(400).json({
			message: 'Group ID is required & At least one member is required!',
		});

	const usergroup = await UserGroup.findOne({ _id: req.body.id }).exec();
	if (!usergroup) {
		return res
			.status(400)
			.json({ message: `No User Group ID matches ${req.body.id}` });
	}

	Array.prototype.push.apply(usergroup.members, req.body.members);

	const result = await usergroup.save();

	res.json(result);
};

const removeGroupMember = async (req, res) => {
	if (!req?.body?.id || !req?.body?.members)
		return res.status(400).json({
			message: 'Group ID is required & At least one member is required!',
		});
};

export {
	getAllUserGroups,
	createNewUserGroup,
	updateUserGroup,
	deleteUserGroup,
	getUserGroup,
	addGroupMember,
};
