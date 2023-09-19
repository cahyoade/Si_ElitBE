import User from "./user.entities.js";

class UserController {
	constructor(userService) {
		this.userService = userService;
	}

	createUser = async (req, res) => {
		const user = new User(
			req.body.id,
			req.body.name,
			req.body.card_id,
			req.body.password,
			req.body.birth_date,
			req.body.grade,
			req.body.telephone_number,
			req.body.role
		);

		try{
			const dbResult = await this.userService.addUser(user);
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};

	getUsers = async (req, res) => {
		if(req.query.userId){
			try{
				const dbResult = await this.userService.getUser(req.query.userId);
				return res.status(200).send(dbResult);
			}catch(err){
				return res.status(500).send(err);
			}
		}
		try{
			const dbResult = await this.userService.getUsers();
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};

	updateUser = async (req, res) => {
		const user = new User(
			req.body.id,
			req.body.name,
			req.body.card_id,
			req.body.password,
			req.body.birth_date,
			req.body.grade,
			req.body.telephone_number,
			req.body.role
		);

		try{
			const dbResult = await this.userService.updateUser(user);
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};

	deleteUser = async (req, res) => {
		if(!req.query.userId){
			return res.status(400).send({msg: "query params userId is needed"})
		}
		try{
			const dbResult = await this.userService.deleteUser(req.query.userId);
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};
}

export default UserController;
