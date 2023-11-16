import PermitController from './permit.controller.js';
import PermitService from './permit.service.js';
import attendanceService from '../attendance/attendance.service.js';
import ClassService from '../class/class.service.js';
import PermitRouter from './permit.router.js';
import AuthService from '../auth/auth.service.js';


class PermitModule {
    constructor(env) {
        this.authService = new AuthService(env);
        this.permitService = new PermitService(env);
        this.attendanceService = new attendanceService(env);
        this.ClassService = new ClassService(env);
        this.permitController = new PermitController(this.permitService, this.attendanceService, this.ClassService, env);
        this.permitRouter = new PermitRouter(this.permitController, this.authService, env);
    }

    create = () => {
        return {
            service: this.permitService,
            controller: this.permitController,
            router: this.permitRouter.getRouter(),
        }
    }
}

export default PermitModule;