import Class from "./class.entities.js";
import moment from "moment";

class ClassController {
	constructor(env, classService, attendanceService) {
		this.env = env;
		this.classService = classService;
		this.attendanceService = attendanceService;
	}

	createClass = async (req, res) => {
		

		if (req.body.multiple_class) {
			try {
				const start_date = moment(req.body.start_date);
				const end_date = moment(req.body.end_date);
				
				while (start_date.isSameOrBefore(end_date, 'day')) {

					
					//create class pagi
					const startpagi_datetime = moment(start_date).set({ "hour": +this.env.startPagi.split(':')[0], "minute": +this.env.startPagi.split(':')[1] }).format('YYYY-MM-DDTHH:mm');
					const endpagi_datetime = moment(start_date).set({ "hour": +this.env.endPagi.split(':')[0], "minute": +this.env.endPagi.split(':')[1] }).format('YYYY-MM-DDTHH:mm');
					
					if((new Date(startpagi_datetime)).getDay()%6==0 && !(+this.env.createWeekendClass)){
						start_date.add(1, 'days');
						continue;
					}
					
					const entityPagi = new Class(
						req.body.id,
						req.body.name,
						startpagi_datetime,
						endpagi_datetime,
						req.body.manager_id,
						req.body.teacher_id,
						req.body.location
						);

					let dbResult = await this.classService.addClass(entityPagi);
					await this.attendanceService.createAttendance(dbResult.insertId);
					
					//create class malam
					const startmalam_datetime = moment(start_date).set({ "hour": +this.env.startMalam.split(':')[0], "minute": +this.env.startMalam.split(':')[1] }).format('YYYY-MM-DDTHH:mm');
					const endmalam_datetime = moment(start_date).set({ "hour": +this.env.endMalam.split(':')[0], "minute": +this.env.endMalam.split(':')[1] }).format('YYYY-MM-DDTHH:mm');
					
					const entityMalam = new Class(
						req.body.id,
						req.body.name_night,
						startmalam_datetime,
						endmalam_datetime,
						req.body.manager_id,
						req.body.teacher_id,
						req.body.location
						);
						
						dbResult = await this.classService.addClass(entityMalam);
						await this.attendanceService.createAttendance(dbResult.insertId);
						
					start_date.add(1, 'days');
				}

				return res.status(200).send({msg: 'Multiple classes created.'});

				}catch (err) {
					return res.status(500).send(err);
				}
			}else {
				const entity = new Class(
					req.body.id,
					req.body.name,
					req.body.start_date,
					req.body.end_date,
					req.body.manager_id,
					req.body.teacher_id,
					req.body.location
				);
				try {
					const dbResult = await this.classService.addClass(entity);
					await this.attendanceService.createAttendance(dbResult.insertId);
					return res.status(200).send({ msg: dbResult.msg });
				} catch (err) {
					return res.status(500).send(err);
				}
			}

		};

		getClass = async (req, res) => {
			if (req.query.classId) {
				try {
					const dbResult = await this.classService.getClass(req.query.classId);
					return res.status(200).send(dbResult);
				} catch (err) {
					return res.status(500).send(err);
				}
			}
			if (req.query.managerId) {
				try {
					const dbResult = await this.classService.getClassesByManagerId(req.query.managerId);
					return res.status(200).send(dbResult);
				} catch (err) {
					return res.status(500).send(err);
				}
			}
			if (req.query.teacherId) {
				try {
					const dbResult = await this.classService.getClassesByTeacherId(req.query.teacherId);
					return res.status(200).send(dbResult);
				} catch (err) {
					return res.status(500).send(err);
				}
			}
			try {
				const dbResult = await this.classService.getClasses();
				return res.status(200).send(dbResult);
			} catch (err) {
				return res.status(500).send(err);
			}
		};

		getClassTypes = async (req, res) => {
			try {
				const dbResult = await this.classService.getClassTypes();
				return res.status(200).send(dbResult);
			} catch (err) {
				return res.status(500).send(err);
			}
		};

		getUpcomingClass = async (req, res) => {
			try {
				const dbResult = await this.classService.getUpcomingClasses();
				return res.status(200).send(dbResult);
			} catch (err) {
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

			try {
				const dbResult = await this.classService.updateClass(entity);
				return res.status(200).send(dbResult);
			} catch (err) {
				return res.status(500).send(err);
			}
		};

		deleteClass = async (req, res) => {
			if (!req.query.classId) {
				return res.status(400).send({ msg: "query params classId is needed" })
			}
			try {
				const dbResult = await this.classService.deleteClass(req.query.classId);
				return res.status(200).send(dbResult);
			} catch (err) {
				return res.status(500).send(err);
			}
		};
	}

export default ClassController;
