import express from 'express';

class UserRouter {
	constructor(userController) {
		this.userController = userController;
	}

	getRouter() {
		const router = express.Router();
		router.route('/').get(this.userController.getUsers);
		router.route('/').post(this.userController.createUser);
		router.route('/').put(this.userController.updateUser);
		router.route('/').delete(this.userController.deleteUser);
		return router;
	}
}

export default UserRouter;