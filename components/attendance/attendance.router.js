import express from 'express';

class AttendanceRouter {
	constructor(attendanceController, authService) {
		this.attendanceController = attendanceController;
		this.authService = authService;
	}

	getRouter() {
		const router = express.Router();
		router.route('/').get(this.authService.authorizeStudent, this.attendanceController.getAttendance);
		router.route('/').post(this.authService.authorizeAdmin, this.attendanceController.createAttendance);
		router.route('/').put(this.authService.authorizeStudent, this.attendanceController.updateAttendance);
		router.route('/').delete(this.authService.authorizeAdmin, this.attendanceController.deleteAttendance);
		return router;
	}
}

export default AttendanceRouter;