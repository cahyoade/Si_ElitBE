import UserController from './user.controller.js';
import UserService from './user.service.js';
import UserRouter from './user.router.js';
import AuthService from '../auth/auth.service.js';


class UserModule {
    constructor(env) {
        this.authService = new AuthService(env);
        this.userService = new UserService(env);
        this.userController = new UserController(this.userService);
        this.userRouter = new UserRouter(this.userController, this.authService);
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