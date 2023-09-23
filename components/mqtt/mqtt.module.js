import AttendanceService from "../attendance/attendance.service.js";
import MqttRouter from "./mqtt.router.js";
import MqttService from "./mqtt.service.js";
import AuthService from "../auth/auth.service.js";

class MqttModule {
    constructor(env){
        this.env = env;
        this.attendanceService = new AttendanceService(env);
        this.AuthService = new AuthService(env);
        this.mqttService = new MqttService(env, this.attendanceService);
        this.mqttRouter = new MqttRouter(this.mqttService.getDevicesStatus, this.AuthService);
    }

    startService = () => {this.mqttService.start()}
    getRouter = () => this.mqttRouter.getRouter();

}

export default MqttModule;