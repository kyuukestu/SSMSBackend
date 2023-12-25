import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../Models/User.js';

const handleLogin = async (req, res) => {
	const { user, pwd } = req.body;
	if (!user || !pwd)
		return res
			.status(400)
			.json({ message: 'Username & Password are required.' });

	const foundUser = await User.findOne({ username: user }).exec();
	if (!foundUser) return res.sendStatus(401); // Unauthorized status code

	// Evaluate password
	const match = await bcrypt.compare(pwd, foundUser.password);

	if (match) {
		const roles = Object.values(foundUser.roles).filter(Boolean);
		// Create JWT
		const accessToken = jwt.sign(
			{
				UserInfo: {
					username: foundUser.username,
					roles: roles,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '5m' } //Change duration of access token
		);
		const refreshToken = jwt.sign(
			{
				username: foundUser.username,
			},
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '1d' }
		);

		// Saving refreshToken with current user
		foundUser.refreshToken = refreshToken;
		const result = await foundUser.save();
		console.log(result);

		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			sameSite: 'None',
			// secure: true, // May need to be commented out when testing with ThunderClient
			maxAge: 24 * 60 * 60 * 1000,
		}); // Send refreshToken as HttpOnly cookie; age of one day
		res.json({ roles, accessToken });
	} else {
		res.sendStatus(401); // Unauthorized
	}
};

export { handleLogin };
