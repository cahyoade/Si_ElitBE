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
                resolve({ msg: "Attendance created." });
            });
        });

    });

    createAttendance = (classId) => new Promise(async (resolve, reject) => {

        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            let query = `select id, role from users`;

            connection.query(query, (err, rows) => {
                if (err) {
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }

                query = `replace into attendances( user_id, class_id) values `;

                rows.map(row => {
                    if (row.role === 1) {
                        query += `(${row.id}, ${classId}),`;
                    }
                });


                connection.query(query.slice(0, -1), (err, rows) => {
                    connection.release();
                    if (err) {
                        reject({ msg: "An error occured while trying to query the database.", err: err});
                        return;
                    }
                    resolve({ msg: "Attendance created." });
                });
            });
        });
    });





    getAttendances = (returnAll, sortByAttend_at, start_date, end_date) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            let query;


            if (returnAll) {
                query = `select a.user_id, a.class_id, u2.nis, u2.name, u2.grade, u2.gender, c.name as class_name, ct.name as class_type, c.start_date, c.end_date, a.attend_at, a.status, IFNULL(ELT(FIELD(u.role, 1, 2, 3), 'santri', 'guru', 'admin'), 'sistem') as lastEditBy from attendances a left join classes c on a.class_id = c.id  left join users u on a.lastEditBy = u.id join users u2 on a.user_id = u2.id left join class_types ct on u2.class_type = ct.id ${sortByAttend_at ? `order by a.attend_at desc` : ''}`;
            } else if (start_date && end_date) {
                query = `select a.user_id, a.class_id, u2.nis, u2.name, u2.grade, u2.gender, c.name as class_name, ct.name as class_type, c.start_date, c.end_date, a.attend_at, a.status, IFNULL(ELT(FIELD(u.role, 1, 2, 3), 'santri', 'guru', 'admin'), 'sistem') as lastEditBy from attendances a left join classes c on a.class_id = c.id  left join users u on a.lastEditBy = u.id join users u2 on a.user_id = u2.id left join class_types ct on u2.class_type = ct.id where c.start_date between '${start_date}' and '${end_date}' ${sortByAttend_at ? `order by a.attend_at desc` : ''}`;
            }
            else if (start_date) {
                query = `select a.user_id, a.class_id, u2.nis, u2.name, u2.grade, u2.gender, c.name as class_name, ct.name as class_type, c.start_date, c.end_date, a.attend_at, a.status, IFNULL(ELT(FIELD(u.role, 1, 2, 3), 'santri', 'guru', 'admin'), 'sistem') as lastEditBy from attendances a left join classes c on a.class_id = c.id  left join users u on a.lastEditBy = u.id join users u2 on a.user_id = u2.id left join class_types ct on u2.class_type = ct.id where c.start_date > '${start_date}' ${sortByAttend_at ? `order by a.attend_at desc` : ''}`;
            }
            else {
                query = `select a.user_id, a.class_id, u2.nis, u2.name, u2.grade, u2.gender, c.name as class_name, ct.name as class_type, c.start_date, c.end_date, a.attend_at, a.status, IFNULL(ELT(FIELD(u.role, 1, 2, 3), 'santri', 'guru', 'admin'), 'sistem') as lastEditBy from attendances a left join classes c on a.class_id = c.id  left join users u on a.lastEditBy = u.id join users u2 on a.user_id = u2.id left join class_types ct on u2.class_type = ct.id where c.start_date > date_sub(now(), interval 6 month) ${sortByAttend_at ? `order by a.attend_at desc` : ''}`;
            }

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

    getAttendanceRecap = (start_date, end_date, class_type) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select u.name, u.gender, 
            makedate(year(c.start_date), week(c.start_date) * 7 - 6) as week_start, 
            makedate(year(c.start_date), week(c.start_date) * 7) as week_end,
            ct.name as class_name,
            count(case a.status 
                when 'hadir' 
                then case when hour(c.start_date) < 14 then 1 else null end
                when 'terlambat' 
                then case when hour(c.start_date) < 14 then 1 else null end
                else null 
                end) as jumlah_hadir_pagi,
            count(case a.status 
                when 'izin' 
                then case when hour(c.start_date) < 14 then 1 else null end
                else null 
                end) as jumlah_izin_pagi,
            count(case when a.status is null 
                then case when hour(c.start_date) < 14 then 1 else null end 
                else null 
                end) as jumlah_alfa_pagi,
            count(case a.status 
                when 'hadir' 
                then case when hour(c.start_date) > 14 then 1 else null end
                when 'terlambat' 
                then case when hour(c.start_date) > 14 then 1 else null end
                else null 
                end) as jumlah_hadir_malam,
            count(case a.status 
                when 'izin' 
                then case when hour(c.start_date) > 14 then 1 else null end
                else null 
                end) as jumlah_izin_malam,
            count(case when a.status is null 
                then case when hour(c.start_date) > 14 then 1 else null end 
                else null 
                end) as jumlah_alfa_malam,
            count(case when hour(c.start_date) > 14 then 1 else null end) as jumlah_sesi_malam,
            count(case when hour(c.start_date) < 14 then 1 else null end) as jumlah_sesi_pagi,
            count(c.start_date) as jumlah_ngaji
            from attendances a left join classes c 
            on a.class_id = c.id 
            left join users u
            on a.user_id = u.id
            left join class_types ct 
            on u.class_type = ct.id
            where u.class_type = ${class_type} 
            and c.start_date between '${start_date}' and '${end_date}'
            group by name, week(c.start_date)`

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
        const currentTime = { date: new Date(), string: moment().format('YYYY-MM-DD HH:mm:ss') };

        //get attendance
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject('koneksi database gagal.');
                return;
            }

            const query = `select a.user_id, a.class_id, c.start_date, a.status, u.name, u.grade, u.nis from attendances a left join classes c
            on a.class_id = c.id
            left join users u
            on a.user_id = u.id
            where '${currentTime.string}' between start_date and end_date
            and card_id = '${cardId}'`;

            connection.query(query, async (err, rows) => {
                connection.release();
                if (err) {
                    reject(`Query database gagal.`);
                    return;
                }
                if (!rows[0]) {
                    reject(`kelas tdk ditemukan`);
                    return;
                }

                if (rows[0].status != null) {
                    reject(`anda sudah presensi`);
                    return;
                }

                newAttendance = new Attendance(
                    rows[0].user_id,
                    rows[0].class_id,
                    currentTime.string,
                    currentTime.date > moment(new Date(rows[0].start_date)).add(+this.env.toleransiTerlambatMenit, 'm').toDate() ? 'terlambat' : 'hadir',
                    rows[0].user_id
                );

                try {
                    const result = await this.updateAttendance(newAttendance);
                    resolve(`${rows[0].nis},${rows[0].name.split(' ')[0]} ${rows[0].grade},${moment().format('H:mm')}`);
                } catch (err) {
                    reject(JSON.stringify(err));
                }
            });
        });



    })

    getAttendancesByUser = (userId, limit) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select a.user_id, a.class_id, u2.nis, u2.name, u2.grade, u2.gender, c.name as class_name, ct.name as class_type, c.start_date, c.end_date, a.attend_at, a.status, IFNULL(ELT(FIELD(u.role, 1, 2, 3), 'santri', 'guru', 'admin'), 'sistem') as lastEditBy from attendances a left join classes c on a.class_id = c.id left join users u on a.lastEditBy = u.id join users u2 on a.user_id = u2.id left join class_types ct on u2.class_type = ct.id where a.user_id = ${userId} order by a.attend_at desc ${limit ?  `limit ${limit}` : ''}`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database.", err: err });
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

            const query = `select a.user_id, a.class_id, u2.nis, u2.name, u2.grade, u2.gender, c.name as class_name, ct.name as class_type, c.start_date, c.end_date, a.attend_at, a.status, IFNULL(ELT(FIELD(u.role, 1, 2, 3), 'santri', 'guru', 'admin'), 'sistem') as lastEditBy from attendances a left join classes c on a.class_id = c.id left join users u on a.lastEditBy = u.id left join class_types ct on u.class_type = ct.id join users u2 on a.user_id = u2.id where a.class_id = ${classId}`;

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

            const query = `select a.user_id, a.class_id, u2.nis, u2.name, u2.grade, u2.gender, c.name as class_name, ct.name as class_type, c.start_date, c.end_date, a.attend_at, a.status, IFNULL(ELT(FIELD(u.role, 1, 2, 3), 'santri', 'guru', 'admin'), 'sistem') as lastEditBy from attendances a left join classes c on a.class_id = c.id left join users u on a.lastEditBy = u.id left join class_types ct on u.class_type = ct.id join users u2 on a.user_id = u2.id where a.user_id=${userId} and a.class_id = ${classId}`;

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
            attend_at=${attendance.attend_at ? `'${attendance.attend_at}'` : null},
            status=${attendance.status ? `'${attendance.status}'` : null},
            lastEditby=${attendance.lastEditby}
            where
            user_id=${attendance.user_id} and
            class_id=${attendance.class_id}`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database.", err: err });
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
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }
                resolve({ msg: "Attendance deleted." });
            });
        });
    });
}

export default AttendanceService;
