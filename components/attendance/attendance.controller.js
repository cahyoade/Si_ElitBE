import moment from "moment";
import Attendance from "./attendance.entities.js";

class AttendanceController {
	constructor(attendanceService, classService) {
		this.attendanceService = attendanceService;
		this.classService = classService;
	}

	createAttendance = async (req, res) => {
		const attendance = new Attendance(
			req.body.user_id,
			req.body.class_id,
			req.body.attend_at,
			req.body.status,
			req.userData.id
		);

		try {
			const dbResult = await this.attendanceService.addAttendance(attendance);
			return res.status(200).send(dbResult);
		} catch (err) {
			return res.status(500).send(err);
		}
	};

	getAttendance = async (req, res) => {
		if (req.userData.role === 1) {
			try {
				const managedClass = await this.classService.getClassesByManagerId(req.userData.id);
				if (!managedClass) {
					const dbResult = await this.attendanceService.getAttendancesByUser(req.userData.id);
					return res.status(200).send(dbResult);
				}
				if(req.query.classId){
				const dbResult = await this.attendanceService.getAttendancesByClass(req.query.classId);
				return res.status(200).send(dbResult);
				}else{
					const dbResult = await this.attendanceService.getAttendancesByUser(req.userData.id);
					return res.status(200).send(dbResult);
				}

			} catch (err) {
				return res.status(500).send(err);
			}
		}

		if (req.query.userId && req.query.classId) {
			try {
				const dbResult = await this.attendanceService.getAttendanceByUserAndClass(req.query.userId, req.query.classId);
				return res.status(200).send(dbResult);
			} catch (err) {
				return res.status(500).send(err);
			}
		}
		if (req.query.userId) {
			try {
				const dbResult = await this.attendanceService.getAttendancesByUser(req.query.userId);
				return res.status(200).send(dbResult);
			} catch (err) {
				return res.status(500).send(err);
			}
		}
		if (req.query.classId) {
			try {
				const dbResult = await this.attendanceService.getAttendancesByClass(req.query.classId);
				return res.status(200).send(dbResult);
			} catch (err) {
				return res.status(500).send(err);
			}
		}
		try {
			const dbResult = await this.attendanceService.getAttendances(req.query.returnAll, req.query.sort, req.query.startDate, req.query.endDate);
			return res.status(200).send(dbResult);
		} catch (err) {
			return res.status(500).send(err);
		}
	};

	updateAttendance = async (req, res) => {

		const attendance = new Attendance(
			req.body.user_id,
			req.body.class_id,
			req.body.status ? moment().format("YYYY-MM-DD HH:mm:ss") : null,
			req.body.status,
			req.userData.id
		);


		try {
			if (req.userData.role === 1) {
				const managedClass = await this.classService.getClassesByManagerId(req.userData.id);
				if (!managedClass.find((c) => c.id === attendance.class_id)) {
					return res.status(200).send({ msg: "You are not allowed to update this attendance." });
				}
			}
			const dbResult = await this.attendanceService.updateAttendance(attendance);
			return res.status(200).send(dbResult);
		} catch (err) {
			return res.status(500).send(err);
		}
	};

	deleteAttendance = async (req, res) => {
		if (!req.query.userId || !req.query.classId) {
			return res.status(400).send({ msg: "query params userId and classId is needed." });
		}
		try {
			const dbResult = await this.attendanceService.deleteAttendance(req.query.userId, req.query.classId);
			return res.status(200).send(dbResult);
		} catch (err) {
			return res.status(500).send(err);
		}
	};
}

export default AttendanceController;
