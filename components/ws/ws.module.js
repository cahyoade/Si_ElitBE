import AttendanceService from "../attendance/attendance.service.js";
import AuthService from "../auth/auth.service.js";
import { WebSocketServer } from "ws";
import express from 'express';
import e from "express";

class WsModule {
	constructor(env, server) {
		this.attendanceService = new AttendanceService(env);
		this.authService = new AuthService(env);
		this.wss = new WebSocketServer({ server });
		this.count = 0;

		this.wss.on('connection', ws => {
			if(!(env.devices.split(',').includes(ws.protocol))) ws.close();
			ws.name = ws.protocol;
			ws.on('message', payload => {
					const [type, data] = payload.toString().split(',');
					if (data && type === 'req_att') {
						this.handleAttendance(ws, data)
					}
			});
		});
	}

	create() {
		return {router: this.getRouter()};
	}

	getRouter() {
		const router = express.Router();
		//router.use(this.authService.authorizeAdmin);
		router.route('/').get(async (_, res) => {
			const deviceStatus = await this.getDevicesStatus();
			return res.status(200).send(deviceStatus);
		});
		return router;
	}

	handleAttendance = async (ws, cardId) => {
    try {
      const result = await this.attendanceService.attendByCardId(cardId);
      ws.send(`res_att,1,${result},${cardId}`);
    } catch (err) {
      ws.send(`res_att,0,${err},${cardId}`);
    }
  }
	
	getDevicesStatus = () => {
		return [...this.wss.clients].reduce((obj, key) => ({...obj, [key.name]: key.readyState === 1}), {})
	}

}

export default WsModule;