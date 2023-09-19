import express from 'express';

class PermitRouter {
	constructor(permitController) {
		this.permitController = permitController;
	}

	getRouter() {
		const router = express.Router();
		router.route('/').get(this.permitController.getPermits);
		router.route('/').post(this.permitController.createPermit);
		router.route('/').put(this.permitController.updatePermit);
		router.route('/').delete(this.permitController.deletePermit);
		return router;
	}
}

export default PermitRouter;