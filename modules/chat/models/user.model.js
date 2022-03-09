const db = require('../../../configs/database');

class user {
    constructor(
        unique_id,
        username,
        password,
        tel
    ) {
        this.unique_id = unique_id;
        this.username = username;
        this.password = password;
        this.tel = tel;
    }
    async findAll() {
        const sql = `SELECT * FROM user`;
        const query = await db.query(sql);
        return query.length == 0 ? null : query[0];
    }
    /* select one */
    async findOne(unique_id) {
        let sql = 'SELECT * FROM user WHERE unique_id= ?;';
        let query = await db.query(sql, [unique_id]);
        return query[0][0];
    }

    /* insert */
    insert() {
        const query = db.query(`INSERT INTO user(unique_id, username, password, tel) VALUE (?,?,?,?)`, [
            this.unique_id,
            this.username,
            this.password,
            this.tel,

        ]);
        return query;
    }
    /* update */
    async update(unique_id) {
        const query = await db.query(`UPDATE user SET unique_id=?, username =?, password=?, tel = ?  WHERE id =?`, [
            this.unique_id,
            this.username,
            this.password,
            this.tel,
            unique_id
        ]);
        return query;
    }
    /* delete */
    async delete(unique_id) {
        const query = await db.query(`DELETE FROM user WHERE unique_id =?`, [unique_id]);
        return query;
    }

    //select username admin
    checklogin(username) {
        let data = db.query('SELECT unique_id, username, password FROM user WHERE username = ? LIMIT 1', [username]);
        return data.length == 0 ? null : data;
    }

    async checkUsername(username) {
        const data = await db.query('SELECT username FROM user WHERE username = ?', [username]);
        return data.length == 0 ? 0 : data[0];
    }

}
module.exports = user;


// SELECT 
//     *
// FROM
//     user
//         LEFT JOIN
//     chat_list ON user.id = chat_list.sender_id
//         LEFT JOIN
//     chat ON chat_list.id = chat.chat_id
// WHERE
//     chat.chat_id = 1 AND chat.who = 2