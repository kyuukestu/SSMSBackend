import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);

	console.log(cookies.jwt);
	const refreshToken = cookies.jwt;

	const foundUser = await User.findOne({ refreshToken }).exec();
	if (!foundUser) return res.sendStatus(403); // Forbidden status code

	// Evaluate jwt
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err || foundUser.username !== decoded.username)
			return res.sendStatus(403); // Forbidden
		const roles = Object.values(foundUser.roles);
		const accessToken = jwt.sign(
			{
				UserInfo: {
					username: decoded.username,
					roles: roles,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: '1h',
			}
		);
		res.json({ accessToken });
	});
};

export { handleRefreshToken };
