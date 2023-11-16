import mysql from "mysql";
import moment from "moment";

class ClassService {
    constructor(env) {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: env.dbHost,
            user: env.dbUser,
            password: env.dbPassword,
            database: env.dbName,
        });
    }

    addClass = (entity) => new Promise((resolve, reject) => {

        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }
            const start_date = moment(entity.start_date).format('YYYY-MM-DD HH:mm:ss');
            const end_date = moment(entity.end_date).format('YYYY-MM-DD HH:mm:ss');

            let query = `select * from classes where (start_date <= '${end_date}') and (end_date >= '${start_date}')`;

            connection.query(query, (err, rows) => {
                if (err) {
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }
                if (rows.length > 0) {
                    resolve({ msg: `Another class already exists in this time period (${rows[0].start_date} - ${rows[0].end_date}).` });
                    return;
                }

                query = `insert into classes( name, start_date, end_date, manager_id, teacher_id, location) values ('${entity.name}','${start_date}', '${end_date}', '${entity.manager_id}', '${entity.teacher_id}', '${entity.location}')`;

                connection.query(query, (err, rows) => {
                    connection.release();
                    if (err) {
                        reject({ msg: "An error occured while trying to query the database.", err: err });
                        return;
                    }
                    resolve({ msg: "Class created.", insertId: rows.insertId })
                });
            });


        });

    });

    addMultipleClass = (entity) => new Promise((resolve, reject) => {
        const start_date = moment(entity.start_date).format('YYYY-MM-DD');
        const end_date = moment(entity.end_date).format('YYYY-MM-DD');

        while(start_date.isBefore(end_date, 'day')){
            const start_datetime = moment(start_date).set({"hour": +this.env.startPagi.split(':')[0], "minute": +this.env.startPagi.split(':')[1]})
            const end_datetime = moment(start_date).set({"hour": +this.env.endPagi.split(':')[0], "minute": +this.env.endPagi.split(':')[1]})

            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject({ msg: "Could not connect to the database." });
                    return;
                }
                
    
                let query = `select * from classes where (start_date <= '${end_date}') and (end_date >= '${start_date}')`;
    
                connection.query(query, (err, rows) => {
                    if (err) {
                        reject({ msg: "An error occured while trying to query the database." });
                        return;
                    }
                    if (rows.length > 0) {
                        resolve({ msg: `Another class already exists in this time period (${rows[0].start_date} - ${rows[0].end_date}).` });
                        return;
                    }
    
                    query = `insert into classes( name, start_date, end_date, manager_id, teacher_id, location) values ('${entity.name}','${start_date}', '${end_date}', '${entity.manager_id}', '${entity.teacher_id}', '${entity.location}')`;
    
                    connection.query(query, (err, rows) => {
                        connection.release();
                        if (err) {
                            reject({ msg: "An error occured while trying to query the database.", err: err });
                            return;
                        }
                        resolve({ msg: "Multiple class created.", insertId: rows.insertId })
                    });
                });
    
            });
        }
    });


    getClasses = (start_date, end_date) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) { 
                reject({ msg: "Could not connect to the database." });
                return;
            }

            let query = `select * from classes order by start_date desc`

            if (start_date && end_date) {
                query = `select * from classes where (start_date > '${start_date}') and (end_date < '${end_date}') order by start_date desc`;
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

    getClassesByManagerId = (managerId) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select * from classes where manager_id = ${managerId} order by start_date desc`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database.", err: err});
                    return;
                }
                resolve(rows);
            });
        });
    });

    getClassesByTeacherId = (teacherId) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select * from classes where teacher_id = ${teacherId} order by start_date desc`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }
                resolve(rows);
            });
        });
    });

    getClassTypes = () => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select * from class_types`;

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

    getUpcomingClasses = (start_date, end_date) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            let query = `select * from classes where start_date > now() limit 20`;

            if (start_date && end_date) {
                query = `select * from classes where (start_date >= '${start_date}') and (start_date <= '${end_date}') order by start_date desc`;
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

    getClass = (classId) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select * from classes where id = ${classId}`;

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

    updateClass = (entity) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const start_date = moment(entity.start_date).format('YYYY-MM-DD HH:mm:ss');
            const end_date = moment(entity.end_date).format('YYYY-MM-DD HH:mm:ss');

            let query = `select * from classes where (start_date <= '${end_date}') and (end_date >= '${start_date}')`;

            connection.query(query, (err, rows) => {
                if (err) {
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }
                if (rows.length > 0) {
                    if (rows[0].id != entity.id) {
                        resolve({ msg: `Another class already exists in this time period (${rows[0].start_date} - ${rows[0].end_date}).` });
                        return;
                    }
                }

                query = `update classes set 
                name='${entity.name}',
                start_date='${start_date}',
                end_date='${end_date}',
                manager_id='${entity.manager_id}',
                teacher_id='${entity.teacher_id}',
                location='${entity.location}'
                where id= ${entity.id}`;

                connection.query(query, (err, rows) => {
                    connection.release();
                    if (err) {
                        reject({ msg: "An error occured while trying to query the database." });
                        return;
                    }
                    resolve({ msg: "Class updated." });
                });
            });
        });

    });

    deleteClass = (classId) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `delete from classes where id=${classId}`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }
                resolve({ msg: "Class deleted." });
            });
        });
    });
}

export default ClassService;
