import Permit from "./permit.entities.js";
import Attendance from "../attendance/attendance.entities.js";
import moment from "moment";
import fs from "fs";


class PermitController {
	constructor(permitService, attendanceService, classService, env) {
		this.permitService = permitService;
		this.attendanceService = attendanceService;
		this.classService = classService;
		this.env = env;
	}

	createPermit = async (req, res) => {
		const permit = new Permit(
			req.userData.id,
			req.body.class_id,
			req.body.description,
			`/${this.env.fileUploadPath}/${req.file.filename}`,
			0,
		);

		try{
			const dbResult = await this.permitService.addPermit(permit);
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};

	getPermits = async (req, res) => {
		if(req.userData.role === 1){
			
			const managedClass = await this.classService.getClassesByManagerId(req.userData.id);
			try{
				let dbResult;
				if(!managedClass.length >= 1){
					dbResult = await this.permitService.getPermitsByUser(req.userData.id);
				}else{
					dbResult = await this.permitService.getPermits(req.query.returnAll, req.query.startDate, req.query.endDate, req.userData.role, req.userData.id);
				}
				return res.status(200).send(dbResult);
			}catch(err){
				return res.status(500).send(err);
			}
		}
        if(req.query.userId && req.query.classId){
			try{
				const dbResult = await this.permitService.getPermitsByUserAndClass(req.query.userId, req.query.classId);
				return res.status(200).send(dbResult);
			}catch(err){
				return res.status(500).send(err);
			}
		}
		if(req.query.userId){
			try{
				const dbResult = await this.permitService.getPermitsByUser(req.query.userId);
				return res.status(200).send(dbResult);
			}catch(err){
				return res.status(500).send(err);
			}
		}
        if(req.query.classId){
			try{
				const dbResult = await this.permitService.getPermitsByClass(req.query.classId);
				return res.status(200).send(dbResult);
			}catch(err){
				return res.status(500).send(err);
			}
		}
		try{
			const dbResult = await this.permitService.getPermits(req.query.returnAll, req.query.startDate, req.query.endDate, req.userData.role, req.userData.id);
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};

	updatePermit = async (req, res) => {
		const managedClass = await this.classService.getClassesByManagerId(req.userData.id);

		if (req.userData.role === 1 && !managedClass) {

			const permit = new Permit(
				req.userData.id,
				req.body.class_id,
				req.body.description,
				req.body.img_url,
				req.body.isApproved,
			);
			try{
				const dbResult = await this.permitService.updatePermitStudent(permit);
				return res.status(200).send(dbResult);
			}catch(err){
				return res.status(500).send(err);
			}
		}

		const permit = new Permit(
			req.body.user_id,
			req.body.class_id,
			req.body.description,
			req.body.img_url,
			req.body.isApproved,
		);

		const attendance = new Attendance(
			req.body.user_id,
			req.body.class_id,
			moment().format("YYYY-MM-DD HH:mm:ss"),
			'izin',
			req.userData.id
		);

		try{
			await this.attendanceService.updateAttendance(attendance);
			const dbResult = await this.permitService.updatePermit(permit);
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};

	deletePermit = async (req, res) => {
		if(req.userData.role === 1){
			if(!req.query.classId){
				return res.status(400).send({msg: "query params classId is needed."});
			}
			try{
				const permit = await this.permitService.getPermitsByUserAndClass(req.userData.id, req.query.classId);
				const dbResult = await this.permitService.deletePermit(req.userData.id, req.query.classId);
				fs.unlinkSync((this.env.INIT_CWD + permit[0].img_url).replace(/\\/g, "/"));
				return res.status(200).send(dbResult);
			}catch(err){
				return res.status(500).send(err);
			}
		}

		if(!req.query.userId || !req.query.classId){
			return res.status(400).send({msg: "query params userId and classId is needed."});
		}
		try{
			const permit = await this.permitService.getPermitsByUserAndClass(req.query.userId, req.query.classId);
			const dbResult = await this.permitService.deletePermit(req.query.userId, req.query.classId);
			fs.unlinkSync((this.env.INIT_CWD + permit[0].img_url).replace(/\\/g, "/"));
			return res.status(200).send(dbResult);
		}catch(err){
			return res.status(500).send(err);
		}
	};
}

export default PermitController;
