import mysql from "mysql";
import bcrypt from "bcrypt";


class UserService {
    constructor(env) {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: env.dbHost,
            user: env.dbUser,
            password: env.dbPassword,
            database: env.dbName,
        });

    }

    addUser = async (user) => new Promise(async (resolve, reject) => {
        const hashedPassword = await bcrypt.hash(user.password, 10).catch((err) => {
            reject({ msg: "Bycrypt error." });
            return;
        });

        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }
            const query = `insert into users( name, card_id, password, birth_date, grade, telephone_number, role) values ('${user.name}','${user.card_id}', '${hashedPassword}', '${user.birth_date}', '${user.grade}', '${user.telephone_number}', '${user.role}')`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }
                resolve({msg: "User created."})
            });
        });

    });

    getUsers = () => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select * from users`;

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

    getUser = (id) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select * from users where id = ${id}`;

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

    updateUser = async (user) => new Promise(async (resolve, reject) => {
        const hashedPassword = await bcrypt.hash(user.password, 10).catch((err) => {
            reject({ msg: "Bcrypt error." });
            return;
        });

        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `update users set 
            name='${user.name}',
            card_id='${user.card_id}',
            password='${hashedPassword}',
            birth_date='${user.birth_date}',
            grade='${user.grade}',
            telephone_number='${user.telephone_number}',
            role='${user.role}'
            where id= ${user.id}
            `;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }
                resolve({ msg: "user updated" });
            });
        });

    });

    deleteUser = (id) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `delete from users where id= ${id}`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database." });
                    return;
                }
                resolve({ msg: "user deleted" });
            });
        });
    });
}

export default UserService;
