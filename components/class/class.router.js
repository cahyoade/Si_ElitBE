import express from 'express';

class ClassRouter {
	constructor(classController) {
		this.classController = classController;
	}

	getRouter() {
		const router = express.Router();
		router.route('/').get(this.classController.getClass);
		router.route('/').post(this.classController.createClass);
		router.route('/').put(this.classController.updateClass);
		router.route('/').delete(this.classController.deleteClass);
		return router;
	}
}

export default ClassRouter;