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
            const query = `insert into users( name, card_id, password, birth_date, grade, telephone_number, role, nis, is_active, inactive_reason, gender, class_type, origin, residence_in_semarang) values ('${user.name}','${user.card_id}', '${hashedPassword}', '${user.birth_date}', '${user.grade}', '${user.telephone_number}', '${user.role}', '${user.nis}', '${user.is_active}', '${user.inactive_reason}', '${user.gender}', '${user.class_type}', '${user.origin}', '${user.residence_in_semarang}')`;

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

            const query = `select u.*, r.name as role_name, ct.name as class_name from users u
            left join roles r
            on u.role = r.id
            left join class_types ct 
            on u.class_type = ct.id`;

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

            const query = `select u.*, r.name as role_name, ct.name as class_name from users u
            left join roles r
            on u.role = r.id
            left join class_types ct 
            on u.class_type = ct.id where u.id = ${id}`;

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

    getUserByName = (name) => new Promise((resolve, reject) => {
        this.pool.getConnection((err, connection) => {
            if (err) {
                reject({ msg: "Could not connect to the database." });
                return;
            }

            const query = `select u.*, r.name as role_name, ct.name as class_name from users u
            left join roles r
            on u.role = r.id
            left join class_types ct 
            on u.class_type = ct.id 
            where u.name='${name}'`;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "Username or password is not correct."});
                    return;
                }
                resolve(rows);
            });
        });
    }
    );

    updateUser = async (user, withUpdatePassword) => new Promise(async (resolve, reject) => {
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
            password='${withUpdatePassword ? hashedPassword : user.password}',
            birth_date='${user.birth_date}',
            grade='${user.grade}',
            telephone_number='${user.telephone_number}',
            role='${user.role}',
            nis='${user.nis}',
            is_active='${user.is_active}',
            inactive_reason='${user.inactive_reason}',
            gender='${user.gender}',
            class_type='${user.class_type}',
            origin='${user.origin}',
            residence_in_semarang ='${user.residence_in_semarang}'
            where id= ${user.id}
            `;

            connection.query(query, (err, rows) => {
                connection.release();
                if (err) {
                    reject({ msg: "An error occured while trying to query the database.", err: err});
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
