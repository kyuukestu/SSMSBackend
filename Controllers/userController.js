import User from '../Models/User.js';

const getAllUsers = async (req, res) => {
	const users = await User.find();
	if (!users) return res.status(204).json({ message: 'No Users found.' });
	res.json(users);
};

const getUserbyName = async (req, res) => {
	if (!req?.params?.name)
		return res.status(400).jason({
			message: 'User name required.',
		});

	const currentUser = await User.findOne({ username: req.params.name }).exec();
	if (!currentUser)
		return res
			.status(204)
			.json({ message: `No user name matches ${req.params.name}` });

	res.json(currentUser);
};

const getUser = async (req, res) => {
	if (!req?.params?.id)
		return res.status(400).jason({
			message: 'User Group ID required.',
		});

	const user = await User.findOne({ _id: req.params.id }).exec();
	if (!user) {
		return res
			.status(204)
			.json({ message: `No user ID matches ${req.params.id}` });
	}
	res.json(user);
};

const updateUser = async (req, res) => {
	if (!req?.body?.id) {
		return res.status(400).json({ message: 'Calendar ID is required!' });
	}

	const user = await User.findOne({
		_id: req.body.id,
	}).exec();

	if (!user) {
		return res
			.status(400)
			.json({ message: `No User ID matches ${req.body.id}` });
	}
	if (req.body?.name) user.name = req.body.name;
	if (req.body?.password) user.password = req.body.password;
	if (req.body?.roles) user.roles = req.body.roles;
	if (req.body?.usergroups) user.usergroups = req.body.usergroups;

	const result = await user.save();

	res.json(result);
};

const deleteUser = async (req, res) => {
	if (!req?.body?.id)
		return res.status(400).json({ message: 'User ID required! ' });

	const user = await UserGroup.findOne({ _id: req.body.id });
	if (!user) {
		return res.status(400).json({ message: `No ID matches ${req.body.id}` });
	}
	const result = await user.deleteOne({ _id: req.body.id });
	res.json(result);
};

const getAllUserGroups = async (req, res) => {
	if (!req?.params?.id)
		return res.status(400).json({
			message: 'User ID is required!',
		});

	const user = await User.findOne({ _id: req.params.id }).exec();
	if (!user)
		return res
			.status(400)
			.json({ message: `No User ID matches ${req.params.id}` });

	const result = user.usergroups;

	res.json(result);
};

const addUserGroup = async (req, res) => {
	if (!req?.body?.id || !req?.body?.usergroups)
		return res.status(400).json({
			message: 'User ID is required! User Group is required!',
		});

	const user = await User.findOne({ _id: req.body.id }).exec();
	if (!user)
		return res
			.status(400)
			.json({ message: `No User ID matches ${req.body.id}` });

	Array.prototype.push.apply(user.usergroups, req.body.usergroups);

	const result = await user.save();

	res.json(result);
};

const removeUserGroup = async (req, res) => {
	if (!req?.body?.id)
		return res.status(400).json({
			message: 'User ID is required!',
		});
	if (!req?.body?.usergroups)
		return res.status(400).json({
			message: 'User Group required!',
		});

	const userGroupID = req.body.usergroups.map((usergroup) => usergroup.groupID);

	console.log(userGroupID);

	if (!userGroupID)
		return res.status(400).json({
			message: 'At least one User Group ID required!',
		});

	const user = await User.findOne({ _id: req.body.id }).exec();
	if (!user)
		return res
			.status(400)
			.json({ message: `No User ID matches ${req.body.id}` });

	user.usergroups = user.usergroups.filter(
		(usergroup) => usergroup.groupID !== userGroupID[0]
	);

	const result = await user.save();

	res.json(result);
};

export {
	getAllUserGroups,
	addUserGroup,
	getUser,
	getAllUsers,
	updateUser,
	deleteUser,
	removeUserGroup,
	getUserbyName,
};
