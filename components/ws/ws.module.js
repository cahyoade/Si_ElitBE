import AttendanceService from "../attendance/attendance.service.js";
import AuthService from "../auth/auth.service.js";
import { WebSocketServer } from "ws";
import express from 'express';

class WsModule {
	constructor(env, server) {
		this.attendanceService = new AttendanceService(env);
		this.authService = new AuthService(env);
		this.wss = new WebSocketServer({ server });
		this.count = 0;
		this.deviceStatus = env.devices.split(',').reduce((obj, key) => ({...obj, [key]: false}), {});

		this.wss.on('connection', ws => {
			if(!(env.devices.split(',').includes(ws.protocol))) ws.close();
			ws.name = ws.protocol;
			this.deviceStatus[ws.name] = true;
			ws.on('message', payload => {
					if (payload.toString() === 'pong') {
						this.deviceStatus[ws.name] = true;
						return;
					}

					const [type, data] = payload.toString().split(',');
					if (data && type === 'req_att') {
						this.handleAttendance(ws, data)
					}
			});
			ws.on('error', console.error);
		});

		setInterval(this.ping, 10000);

	}

	ping = () => {
		this.wss.clients.forEach(ws => {
			this.deviceStatus[ws.name] = false
			if (ws.readyState === 1) {
				ws.send('ping');
			}
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
		return this.deviceStatus;
	}
}


export default WsModule;