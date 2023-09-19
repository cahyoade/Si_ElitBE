import AttendanceController from './attendance.controller.js';
import AttendanceService from './attendance.service.js';
import AttendanceRouter from './attendance.router.js';


class AttendanceModule {
    constructor(env) {
        this.attendanceService = new AttendanceService(env);
        this.attendanceController = new AttendanceController(this.attendanceService);
        this.attendanceRouter = new AttendanceRouter(this.attendanceController);
    }

    create = () => {
        return {
            service: this.attendanceService,
            controller: this.attendanceController,
            router: this.attendanceRouter.getRouter(),
        }
    }
}

export default AttendanceModule;