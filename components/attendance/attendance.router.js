import express from 'express';

class AttendanceRouter {
	constructor(attendanceController) {
		this.attendanceController = attendanceController;
	}

	getRouter() {
		const router = express.Router();
		router.route('/').get(this.attendanceController.getAttendance);
		router.route('/').post(this.attendanceController.createAttendance);
		router.route('/').put(this.attendanceController.updateAttendance);
		router.route('/').delete(this.attendanceController.deleteAttendance);
		return router;
	}
}

export default AttendanceRouter;