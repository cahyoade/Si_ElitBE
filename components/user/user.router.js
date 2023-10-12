import express from 'express';

class UserRouter {
	constructor(userController, authService) {
		this.userController = userController;
		this.authService = authService;
	}

	getRouter() {
		const router = express.Router();
		router.route('/').get(this.authService.authorizeStudent, this.userController.getUsers);
		router.route('/').post(this.authService.authorizeAdmin, this.userController.createUser);
		router.route('/').put(this.authService.authorizeStudent, this.userController.updateUser);
		router.route('/').delete(this.authService.authorizeAdmin, this.userController.deleteUser);
		return router;
	}
}

export default UserRouter;