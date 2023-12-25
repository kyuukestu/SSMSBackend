import bcrypt from 'bcrypt';

import User from '../Models/User.js';

const handleNewUser = async (req, res) => {
	const { user, pwd } = req.body;
	if (!user || !pwd)
		return res
			.status(400)
			.json({ message: 'Username & Password are required.' });

	// Check for duplicate usernames
	const duplicate = await User.findOne({ username: user }).exec();
	if (duplicate) return res.sendStatus(409); // Conflict Status Code
	try {
		// Encrypt the password
		const hashedPwd = await bcrypt.hash(pwd, 10);

		// Create and store the new user
		const result = await User.create({
			username: user,
			password: hashedPwd,
		});

		console.log(result);

		res.status(201).json({ success: `New user ${user} created!` });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export { handleNewUser };
