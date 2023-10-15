import express from 'express';

class ClassRouter {
	constructor(classController, authService) {
		this.classController = classController;
		this.authService = authService;
	}

	getRouter() {
		const router = express.Router();
		router.route('/').get(this.authService.authorizeStudent, this.classController.getClass);
		router.route('/upcoming').get(this.classController.getUpcomingClass);
		router.route('/types').get(this.classController.getClassTypes);
		router.route('/').post(this.authService.authorizeAdmin, this.classController.createClass);
		router.route('/').put(this.authService.authorizeAdmin, this.classController.updateClass);
		router.route('/').delete(this.authService.authorizeAdmin, this.classController.deleteClass);
		return router;
	}


}

export default ClassRouter;