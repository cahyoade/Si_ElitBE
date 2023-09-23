import express from 'express';

class MqttRouter {
	constructor(getDeviceStatus, authService) {
		this.authService = authService;
		this.getDeviceStatus = getDeviceStatus;
	}

	getRouter() {
		const router = express.Router();
		router.use(this.authService.authorizeAdmin);
		router.route('/').get(async (req, res) => {
			const deviceStatus = await this.getDeviceStatus();
			return res.status(200).send(deviceStatus);
		});
		return router;
	}
}

export default MqttRouter;