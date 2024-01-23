import User from "./user.entities.js";
import moment from "moment";
import bcrypt from "bcrypt";

class UserController {
	constructor(userService) {
		this.userService = userService;
	}

	createUser = async (req, res) => {

		const date = moment(req.body.birth_date).format('YYYY-MM-DD');
		let card_id;
		try	{
			card_id = req.body.card_id.toUpperCase();
		}catch(err){
			card_id = null;
		}

		const user = new User(
			req.body.id,
			req.body.name,
			card_id,
			req.body.password,
			date,
			req.body.grade,
			req.body.telephone_number,
			req.body.role,
			req.body.nis,
			req.body.is_active,
			req.body.inactive_reason,
			req.body.gender,
			req.body.class_type,
			req.body.origin,
			req.body.residence_in_semarang
		);

		try {
			const dbResult = await this.userService.addUser(user);
			return res.status(200).send(dbResult);
		} catch (err) {
			return res.status(500).send(err);
		}
	};

	getUsers = async (req, res) => {
		if(req.userData.role === 1){
			try {
				const dbResult = await this.userService.getUser(req.userData.id);
				return res.status(200).send(dbResult);
			} catch (err) {
				return res.status(500).send(err);
			}
		}
		
		if (req.query.userId) {
			try {
				const dbResult = await this.userService.getUser(req.query.userId);
				return res.status(200).send(dbResult);
			} catch (err) {
				return res.status(500).send(err);
			}
		}
		try {
			const dbResult = await this.userService.getUsers();
			return res.status(200).send(dbResult);
		} catch (err) {
			return res.status(500).send(err);
		}
	};

	updateUser = async (req, res) => {

		if (req.userData.role === 1) {
			const date = moment(req.userData.birth_date).format('YYYY-MM-DD');
			const user = new User(
				req.userData.id,
				req.userData.name,
				req.userData.card_id,
				req.body.passwordNew || req.userData.password,
				date,
				req.userData.grade,
				req.body.telephone_number,
				req.userData.role,
				req.userData.nis,
				req.userData.is_active,
				req.userData.inactive_reason,
				req.userData.gender,
				req.userData.class_type,
				req.userData.origin,
				req.body.residence_in_semarang
			);

			try {
				const auth = await bcrypt.compare(req.body.password, req.userData.password);
				if (auth) {
					
					const dbResult = await this.userService.updateUser(user, req.body.passwordNew);
					return res.status(200).send(dbResult);
				}
				return res.status(200).send({ msg: 'password is not correct' });

			} catch (err) {
				return res.status(500).send(err);
			}
		}

		const date = moment(req.body.birth_date).format('YYYY-MM-DD');
		let card_id;
		try	{
			card_id = req.body.card_id.toUpperCase();
		}catch(err){
			card_id = null;
		}
		
		const user = new User(
			req.body.id,
			req.body.name,
			card_id,
			req.body.passwordNew || req.body.password,
			date,
			req.body.grade,
			req.body.telephone_number,
			req.body.role,
			req.body.nis,
			req.body.is_active,
			req.body.inactive_reason,
			req.body.gender,
			req.body.class_type,
			req.body.origin,
			req.body.residence_in_semarang
		);

		try {
			const dbResult = await this.userService.updateUser(user, req.body.passwordNew);
			return res.status(200).send(dbResult);
		} catch (err) {
			return res.status(500).send(err);
		}
	};

	deleteUser = async (req, res) => {
		if (!req.query.userId) {
			return res.status(400).send({ msg: "query params userId is needed" })
		}
		try {
			const dbResult = await this.userService.deleteUser(req.query.userId);
			return res.status(200).send(dbResult);
		} catch (err) {
			return res.status(500).send(err);
		}
	};
}

export default UserController;
