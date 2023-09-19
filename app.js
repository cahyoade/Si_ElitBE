import express from 'express';
import cors from 'cors';
import UserModule from './components/user/user.module.js';
import PermitModule from './components/leavePermit/permit.module.js';
import ClassModule from './components/class/class.module.js';
import AttendanceModule from './components/attendance/attendance.module.js';

class App {
    constructor(env) {
        this.userModule = new UserModule(env);
        this.permitModule = new PermitModule(env);
        this.classModule = new ClassModule(env);
        this.attendanceModule = new AttendanceModule(env);

        this.app = express();
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(cors({ origin: 'localhost' }));
        this.app.use('/users', this.userModule.create().router);
        this.app.use('/permits', this.permitModule.create().router);
        this.app.use('/classes', this.classModule.create().router);
        this.app.use('/attendances', this.attendanceModule.create().router);
    }

    create = () => this.app;
}


export default App;