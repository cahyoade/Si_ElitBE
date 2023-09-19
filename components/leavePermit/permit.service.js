import mysql from "mysql";

class PermitService {
    constructor(env) {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: env.dbHost,
            user: env.dbUser,
            password: env.dbPassword,
            database: env.dbName,
        });
    }

    addPermit = (permit) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }
            const query = `insert into leave_permits( user_id, class_id, description, img_url, isApproved) values ('${permit.user_id}','${permit.class_id}', '${permit.description}', '${permit.img_url}', '${permit.isApproved}')`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }
                resolve({msg: "Permit created."});
            });
        });

    });

    getPermits = () => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select * from leave_permits`;

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

    getPermitsByUser = (userId) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select * from leave_permits where user_id = ${userId}`;

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

    getPermitsByClass = (classId) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select * from leave_permits where class_id = ${classId}`;

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

    getPermitsByUserAndClass = (userId, classId) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select * from leave_permits where user_id=${userId} and class_id = ${classId}`;

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

    updatePermit = (permit) => new Promise((resolve, reject) => {
        
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `update leave_permits set 
            description='${permit.description}',
            img_url='${permit.img_url}',
            isApproved='${permit.isApproved}'
            where
            user_id='${permit.user_id}' and
            class_id='${permit.class_id}'`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }
                resolve({ msg: "Permit updated" });
            });
        });

    });

    deletePermit = (userId, classId) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `delete from users where user_id=${userId} class_id=${classId}`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }
                resolve({ msg: "Permit deleted." });
            });
        });
    });
}

export default PermitService;
