import AttendanceController from './attendance.controller.js';
import AttendanceService from './attendance.service.js';
import AttendanceRouter from './attendance.router.js';
import AuthService from '../auth/auth.service.js';


class AttendanceModule {
    constructor(env) {
        this.attendanceService = new AttendanceService(env);
        this.authService = new AuthService(env);
        this.attendanceController = new AttendanceController(this.attendanceService);
        this.attendanceRouter = new AttendanceRouter(this.attendanceController, this.authService);
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