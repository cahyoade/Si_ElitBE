import AttendanceService from "../attendance/attendance.service.js";
import MqttRouter from "./mqtt.router.js";
import MqttService from "./mqtt.service.js";
import AuthService from "../auth/auth.service.js";
import { spawn, exec } from 'child_process';

class MqttModule {
    constructor(env){
        this.env = env;
        this.attendanceService = new AttendanceService(env);
        this.AuthService = new AuthService(env);
        this.mqttService = new MqttService(env, this.attendanceService);
        this.mqttRouter = new MqttRouter(this.mqttService.getDevicesStatus, this.AuthService);
    }

    startService = () => {
        const broker = spawn('mosquitto', ['-v', '-c', 'mosquitto.conf'], {shell: true, cwd: process.cwd() + "\\components\\mosquitto"});
        broker.stderr.on('data', (data) => {
            console.log(`stdout: ${data.toString()}`);
        });
        this.mqttService.start();
    }
    getRouter = () => this.mqttRouter.getRouter();

    create = () => {
        this.startService();
        return {router : this.getRouter()}
    };

}

export default MqttModule;