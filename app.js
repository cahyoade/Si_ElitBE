import express from 'express';
import cors from 'cors';
import UserModule from './components/user/user.module.js';
import PermitModule from './components/leavePermit/permit.module.js';
import ClassModule from './components/class/class.module.js';
import AttendanceModule from './components/attendance/attendance.module.js';
import AuthModule from './components/auth/auth.module.js';
import MqttModule from './components/mqtt/mqtt.module.js';
import fs from 'fs';

class App {
    constructor(env) {
        this.env = env;
        this.userModule = new UserModule(env);
        this.permitModule = new PermitModule(env);
        this.classModule = new ClassModule(env);
        this.attendanceModule = new AttendanceModule(env);
        this.authModule = new AuthModule(env);
        this.mqttModule = new MqttModule(env);
        this.app = express();
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
        this.app.use('/mqtt', this.mqttModule.create().router);
        if (!fs.existsSync(this.env.fileUploadPath)){
            fs.mkdirSync(this.env.fileUploadPath, { recursive: true });
        }
        return this.app;
    };
}


export default App;