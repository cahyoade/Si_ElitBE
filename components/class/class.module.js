import ClassController from './class.controller.js';
import ClassService from './class.service.js';
import ClassRouter from './class.router.js';
import AuthService from '../auth/auth.service.js';


class ClassModule {
    constructor(env) {
        this.authService = new AuthService(env);
        this.classService = new ClassService(env);
        this.classController = new ClassController(this.classService);
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