import express from 'express';

class PermitRouter {
	constructor(permitController, authService) {
		this.permitController = permitController;
		this.authService = authService;
	}

	getRouter() {
		const router = express.Router();
		router.use(this.authService.authorizeStudent);
		router.route('/').get(this.permitController.getPermits);
		router.route('/').post(this.permitController.createPermit);
		router.route('/').put(this.permitController.updatePermit);
		router.route('/').delete(this.permitController.deletePermit);
		return router;
	}
}

export default PermitRouter;