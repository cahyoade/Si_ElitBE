import Permit from "./permit.entities.js";

class PermitController {
	constructor(permitService) {
		this.permitService = permitService;
	}

	createPermit = async (req, res) => {
		const permit = new Permit(
			req.body.user_id,
			req.body.class_id,
			req.body.description,
			req.body.img_url,
			req.body.isApproved,
		);

		try{
			const dbResult = await this.permitService.addPermit(permit);
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};

	getPermits = async (req, res) => {
        if(req.query.userId && req.query.classId){
			try{
				const dbResult = await this.permitService.getPermitByUserAndClass(req.query.userId, req.query.classId);
				return res.status(200).send(dbResult);
			}catch(err){
				return res.status(500).send(err);
			}
		}
		if(req.query.userId){
			try{
				const dbResult = await this.permitService.getPermitByUser(req.query.userId);
				return res.status(200).send(dbResult);
			}catch(err){
				return res.status(500).send(err);
			}
		}
        if(req.query.classId){
			try{
				const dbResult = await this.permitService.getPermitByClass(req.query.classId);
				return res.status(200).send(dbResult);
			}catch(err){
				return res.status(500).send(err);
			}
		}
		try{
			const dbResult = await this.permitService.getPermits();
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};

	updatePermit = async (req, res) => {
		const permit = new Permit(
			req.body.user_id,
			req.body.class_id,
			req.body.description,
			req.body.img_url,
			req.body.isApproved,
		);

		try{
			const dbResult = await this.permitService.updatePermit(permit);
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};

	deletePermit = async (req, res) => {
		if(!req.query.userId || !req.query.classId){
			return res.status(400).send({msg: "query params userId and classId is needed."});
		}
		try{
			const dbResult = await this.permitService.deletePermit(req.query.userId, req.query.classId);
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};
}

export default PermitController;
