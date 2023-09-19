import PermitController from './permit.controller.js';
import PermitService from './permit.service.js';
import PermitRouter from './permit.router.js';


class PermitModule {
    constructor(env) {
        this.permitService = new PermitService(env);
        this.permitController = new PermitController(this.permitService);
        this.permitRouter = new PermitRouter(this.permitController);
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