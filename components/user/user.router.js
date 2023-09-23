import express from 'express';

class UserRouter {
	constructor(userController, authService) {
		this.userController = userController;
		this.authService = authService;
	}

	getRouter() {
		const router = express.Router();
		router.use(this.authService.authorizeAdmin);
		router.route('/').get(this.userController.getUsers);
		router.route('/').post(this.userController.createUser);
		router.route('/').put(this.userController.updateUser);
		router.route('/').delete(this.userController.deleteUser);
		return router;
	}
}

export default UserRouter;