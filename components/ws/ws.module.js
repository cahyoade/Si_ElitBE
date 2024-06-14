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
			console.log(ws);
			if(!(env.devices.split(',').includes(ws.protocol))) ws.close();
			ws.name = ws.protocol;
			this.deviceStatus[ws.name] = true;
			ws.on('message', payload => {
					const [type, data] = payload.toString().split(',');
					if (data && type === 'req_att') {
						this.handleAttendance(ws, data)
					}
			});
			ws.on('error', console.error);
			ws.on('pong', () => {
				clearTimeout(ws.timeout);
				this.deviceStatus[ws.name] = true;
			});
			ws.on('ping', () => {
				ws.pong();
			})
		});

		setInterval(this.ping, 10000);
	}

	ping = () => {
		this.wss.clients.forEach(ws => {
			this.deviceStatus[ws.name] = false
			ws.timeout = setTimeout(() => {
				ws.terminate();
			}, 1000);
			if (ws.readyState === 1) {
				ws.ping();
			}
		});
	}

	create() {
		return {router: this.getRouter()};
	}

	getRouter() {
		const router = express.Router();
		router.use(this.authService.authorizeAdmin);
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