import ClassController from './class.controller.js';
import ClassService from './class.service.js';
import ClassRouter from './class.router.js';
import AuthService from '../auth/auth.service.js';
import AttendanceService from '../attendance/attendance.service.js';


class ClassModule {
    constructor(env) {
        this.authService = new AuthService(env);
        this.classService = new ClassService(env);
        this.AttendanceService = new AttendanceService(env);
        this.classController = new ClassController(env, this.classService, this.AttendanceService);
        this.classRouter = new ClassRouter(this.classController, this.authService);
    }

    create = () => {
        return {
            service: this.classService,
            controller: this.classController,
            router: this.classRouter.getRouter(),
        }
    }
}

export default ClassModule;