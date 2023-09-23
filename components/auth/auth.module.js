import AuthController from './auth.controller.js';
import AuthRouter from './auth.router.js';
import UserService from '../user/user.service.js';


class AuthModule {
    constructor(env) {
        this.userService = new UserService(env);
        this.authController = new AuthController(this.userService, env);
        this.authRouter = new AuthRouter(this.authController);
    }

    create = () => {
        return {
            controller: this.authController,
            router: this.authRouter.getRouter(),
        }
    }
}

export default AuthModule;