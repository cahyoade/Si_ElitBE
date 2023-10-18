import * as mqtt from "mqtt";

class MqttService {
    constructor(env, attendanceService){
        this.env = env;
        this.attendanceService = attendanceService;
        this.devicesStatus = env.devices.split(',').reduce((obj, key) => ({...obj, [key]: false}), {});
    }

    start = () => {
        this.client = mqtt.connect(this.env.mqttBrokerHost);
        this.client.on('connect', () => {
            Object.keys(this.devicesStatus).map(device => {
                this.client.subscribe(device);
            });
            console.log('mqtt connected');
        });
        this.client.on('close', () => {
            console.log('mqtt disconnected');
        })
        setInterval(this.ping, +this.env.pingIntervalSeconds * 1000);
        this.client.on('message', (topic, payload) => {
            const [type, data] = payload.toString().split(',');

            if(data && type === 'req_att'){
                this.setStatus(topic, true);
                this.handleAttendance(topic, data);
            }

            if(type === 'req_connect'){
                this.setStatus(topic, true);
                this.client.publish(topic, `res_connect`);
            }

            if(type === 'ping_reply') this.setStatus(topic, true);
            if(type === 'disconnect') this.setStatus(topic, false);
        });
    }

    handleAttendance = async (topic, cardId) => {
        try{
            const result = await this.attendanceService.attendByCardId(cardId);
            this.client.publish(topic, `res_att,1,${result}`);
        }catch(err){
            this.client.publish(topic, `res_att,0,${err}`);
        }
    }

    setStatus = (deviceName, status) => {
        this.devicesStatus = {
            ...this.devicesStatus,
            [deviceName]: status
        };
    }

    ping = () => {
        Object.keys(this.devicesStatus).map(device => {
            this.client.publish(device, 'ping');
        });
    }

    getDevicesStatus = async () => {
        this.ping();
        await new Promise(resolve => setTimeout(resolve, +this.env.getDevicesStatusWaitTimeSeconds * 1000));
        return this.devicesStatus;
    }

}
export default MqttService;