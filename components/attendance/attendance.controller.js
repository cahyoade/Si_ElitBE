import Attendance from "./attendance.entities.js";

class AttendanceController {
	constructor(attendanceService) {
		this.attendanceService = attendanceService;
	}

	createAttendance = async (req, res) => {
		const attendance = new Attendance(
			req.body.user_id,
			req.body.class_id,
			req.body.attend_at,
			req.body.status,
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
				const dbResult = await this.attendanceService.getAttendancesByUser(req.userData.id);
				return res.status(200).send(dbResult);
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
			const dbResult = await this.attendanceService.getAttendances();
			return res.status(200).send(dbResult);
		} catch (err) {
			return res.status(500).send(err);
		}
	};

	updateAttendance = async (req, res) => {
		const attendance = new Attendance(
			req.body.user_id,
			req.body.class_id,
			req.body.attend_at,
			req.body.status,
		);

		try {
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
