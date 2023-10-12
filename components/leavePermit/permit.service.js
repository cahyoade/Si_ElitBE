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
            const query = `insert into leave_permits( user_id, class_id, description, img_url, is_approved) values ('${permit.user_id}','${permit.class_id}', '${permit.description}', '${permit.img_url}', '${permit.isApproved}')`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    if(err.code === 'ER_DUP_ENTRY'){
                        reject({ msg: "Permit already exists." });
                        return;
                    }
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

            const query = `select c.id as class_id, c.name as class_name, ct.name as class_type, c.start_date, c.end_date, p.description, p.is_approved, p.img_url from leave_permits p left join classes c on p.class_id = c.id left join class_types ct on c.type = ct.id`;

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

    getPermitsByUser = (userId) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }
            const query = `select c.id as class_id, c.name as class_name, ct.name as class_type, c.start_date, c.end_date, p.description, p.is_approved, p.img_url from leave_permits p left join classes c on p.class_id = c.id left join class_types ct on c.type = ct.id where p.user_id = ${userId}`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database.", err: err});
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

            const query = `select c.id as class_id, c.name as class_name, ct.name as class_type, c.start_date, c.end_date, p.description, p.is_approved, p.img_url from leave_permits p left join classes c on p.class_id = c.id left join class_types ct on c.type = ct.id where p.class_id = ${classId}`;

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

            const query = `select c.id as class_id, c.name as class_name, ct.name as class_type, c.start_date, c.end_date, p.description, p.is_approved, p.img_url from leave_permits p left join classes c on p.class_id = c.id left join class_types ct on c.type = ct.id where p.user_id=${userId} and p.class_id = ${classId}`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database.", err: err});
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
            is_approved='${permit.isApproved}'
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

    updatePermitStudent = (permit) => new Promise((resolve, reject) => {
        
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `update leave_permits set 
            description='${permit.description}',
            img_url='${permit.img_url}',
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

            const query = `delete from leave_permits where user_id=${userId} and class_id=${classId}`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database.", err: err});
                    return;
                }
                resolve({ msg: "Permit deleted." });
            });
        });
    });
}

export default PermitService;
