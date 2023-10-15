import Class from "./class.entities.js";

class ClassController {
	constructor(classService) {
		this.classService = classService;
	}

	createClass = async (req, res) => {
		const entity = new Class(
			req.body.id,
			req.body.name,
			req.body.start_date,
			req.body.end_date,
			req.body.manager_id,
			req.body.teacher_id,
			req.body.location
		);

		try{
			const dbResult = await this.classService.addClass(entity);
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};

	getClass = async (req, res) => {
		if(req.query.classId){
			try{
				const dbResult = await this.classService.getClass(req.query.classId);
				return res.status(200).send(dbResult);
			}catch(err){
				return res.status(500).send(err);
			}
		}
		try{
			const dbResult = await this.classService.getClasses();
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};

	getClassTypes = async (req, res) => {
		try{
			const dbResult = await this.classService.getClassTypes();
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};

	getUpcomingClass = async (req, res) => {
		try{
			const dbResult = await this.classService.getUpcomingClasses();
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};

	updateClass = async (req, res) => {
		const entity = new Class(
			req.body.id,
			req.body.name,
			req.body.start_date,
			req.body.end_date,
			req.body.manager_id,
			req.body.teacher_id,
			req.body.location
		);

		try{
			const dbResult = await this.classService.updateClass(entity);
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};

	deleteClass = async (req, res) => {
		if(!req.query.classId){
			return res.status(400).send({msg: "query params classId is needed"})
		}
		try{
			const dbResult = await this.classService.deleteClass(req.query.classId);
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};
}

export default ClassController;
