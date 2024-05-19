import express from 'express';
import cors from 'cors';
import UserModule from './components/user/user.module.js';
import PermitModule from './components/leavePermit/permit.module.js';
import ClassModule from './components/class/class.module.js';
import AttendanceModule from './components/attendance/attendance.module.js';
import AuthModule from './components/auth/auth.module.js';
import WsModule from './components/ws/ws.module.js';
import fs from 'fs';

class App {
	constructor(env) {
		this.env = env;
		this.app = express();
		this.userModule = new UserModule(env);
		this.permitModule = new PermitModule(env);
		this.classModule = new ClassModule(env);
		this.attendanceModule = new AttendanceModule(env);
		this.authModule = new AuthModule(env);
		this.server = this.app.listen(env.port, () => {
			console.log(`Server is running on port ${env.port}`);
		});
		this.WsModule = new WsModule(env, this.server);
	}

	create = () => {
		this.app.use(express.json());
		this.app.use('/public', express.static('public'));
		this.app.use(cors({ origin: '*' }));
		this.app.use('/users', this.userModule.create().router);
		this.app.use('/permits', this.permitModule.create().router);
		this.app.use('/classes', this.classModule.create().router);
		this.app.use('/attendances', this.attendanceModule.create().router);
		this.app.use('/auth', this.authModule.create().router);
		this.app.use('/ws', this.WsModule.create().router);
		if (!fs.existsSync(this.env.fileUploadPath)) {
			fs.mkdirSync(this.env.fileUploadPath, { recursive: true });
		}
		return this.app;
	};
}


export default App;