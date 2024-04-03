import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthController {
	constructor(userService, env) {
		this.userService = userService;
		this.env = env;
	}

	login = async (req, res) => {
		try {
			const dbResult = await this.userService.getUserByName(req.body.name);
			if (dbResult.length < 1) {
				return res.status(200).send({ msg: 'username or password is not correct' });
			}

			const auth = await bcrypt.compare(req.body.password, dbResult[0].password);

			if (auth) {
				const userInfo = { ...dbResult[0] };
				const accessToken = jwt.sign(userInfo, this.env.secret, { expiresIn: this.env.tokenExpireTimeHours + 'h' });
				return res.status(200).send({ msg: 'logged in', accessToken: accessToken });
			}

			return res.status(200).send({ msg: 'username or password is not correct' });

		} catch (err) {
			return res.status(200).send(err);
		}
	};

}

export default AuthController;
