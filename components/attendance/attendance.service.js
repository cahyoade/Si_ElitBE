import mysql from "mysql";
import Attendance from "./attendance.entities.js";
import moment from "moment/moment.js";

class AttendanceService {
    constructor(env) {
        this.env = env;
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: env.dbHost,
            user: env.dbUser,
            password: env.dbPassword,
            database: env.dbName,
        });
    }

    addAttendance = (attendance) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }
            const query = `insert into attendances( user_id, class_id, attend_at, status) values ('${attendance.user_id}','${attendance.class_id}', '${attendance.attend_at}', '${attendance.status}')`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }
                resolve({msg: "Attendance created."});
            });
        });

    });

    getAttendances = () => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select * from attendances`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }
                resolve(rows);
            });
        });
    }
    );

    attendByCardId = (cardId) => new Promise(async (resolve, reject) => {
        let newAttendance;
        const currentTime = {date: new Date(), string: moment().format('YYYY-MM-DD HH:mm:ss')};
        
        //get attendance
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject('koneksi database gagal.');
                return;
            }
            
            const query = `select user_id, class_id, start_date, status from attendances a left join classes c
            on a.class_id = c.id
            left join users u
            on a.user_id = u.id
            where '2023-09-20 12:03:22' between start_date and end_date
            and card_id = '${cardId}'`;

            connection.query(query, async (err, rows) => {
                connection.release();
                if (err) {
                    reject(`Query database gagal.`);
                    return;
                }
                if(!rows[0]){
                    reject(`kelas tidak ditemukan.`);
                    return;
                }

                if(rows[0].status != null){
                    reject(`anda sudah presensi.`);
                    return;
                }

                newAttendance = new Attendance(
                    rows[0].user_id,
                    rows[0].class_id,
                    currentTime.string,
                    currentTime.date > moment(new Date(rows[0].start_date)).add(+this.env.toleransiTerlambatMenit, 'm').toDate() ? 'terlambat' : 'hadir'
                );

                try{
                    const result = await this.updateAttendance(newAttendance);
                    resolve(newAttendance.status);
                }catch(err){
                    reject(JSON.stringify(err));
                }
            });
        });

        
        
    })

    getAttendancesByUser = (userId) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select * from attendances where user_id = ${userId}`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }
                resolve(rows);
            });
        });
    }
    );

    getAttendancesByClass = (classId) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select * from attendances where class_id = ${classId}`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }
                resolve(rows);
            });
        });
    }
    );

    getAttendanceByUserAndClass = (userId, classId) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select * from attendances where user_id=${userId} and class_id = ${classId}`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }
                resolve(rows);
            });
        });
    }
    );

    updateAttendance = (attendance) => new Promise((resolve, reject) => {
        
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `update attendances set 
            attend_at='${attendance.attend_at}',
            status='${attendance.status}'
            where
            user_id='${attendance.user_id}' and
            class_id='${attendance.class_id}'`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database."});
                    return;
                }
                resolve({ msg: "Attendance updated." });
            });
        });

    });

    deleteAttendance = (userId, classId) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `delete from attendances where user_id=${userId} and class_id=${classId}`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database."});
                    return;
                }
                resolve({ msg: "Attendance deleted." });
            });
        });
    });
}

export default AttendanceService;
