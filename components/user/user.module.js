import UserController from './user.controller.js';
import UserService from './user.service.js';
import UserRouter from './user.router.js';


class UserModule {
    constructor(env) {
        this.userService = new UserService(env);
        this.userController = new UserController(this.userService);
        this.userRouter = new UserRouter(this.userController);
    }

    create = () => {
        return {
            service: this.userService,
            controller: this.userController,
            router: this.userRouter.getRouter(),
        }
    }
}

export default UserModule;