const db = require('../../../configs/database');

class chatlist {
    constructor(
        unique_id,
        sender_id,
        receiver_id,
        receiver_name,
        unread,
        last_message,
        
    ) {
        this.unique_id = unique_id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.receiver_name = receiver_name;
        this.unread = unread;
        this.last_message = last_message;

    }
    async checkData(sender_id, receiver_id, receiver_name, unread, last_message ) {
        let sql = `SELECT * FROM chat_list WHERE sender_id = ? AND receiver_id = ? AND receiver_name =? AND unread = ? AND last_message =?`;
        let data = [sender_id, receiver_id, receiver_name, unread, last_message];
        const query = await db.query(sql, data);
        return query.length == 0 ? null : query[0][0];
    }

    async insertMultiple(){
        const sql = `SELECT unique_id, username FROM user INNERE JOIN chat_list ON chat_list. sender_id, chat_list.reciever_id`;
        const query = await db.query(sql);
        return query.length == 0 ? null : query[0][0];
    }


    async findAll() {
        let sql = `SELECT * FROM chat_list`;
        let query = await db.query(sql);
        return query.length == 0 ? null : query[0];
    }

    async findOne(unique_id) {
        let sql = `SELECT * FROM chat_list WHERE unique_id = ?`;
        let query = await db.query(sql, [unique_id]);
        return query[0][0];

    }
    async insert() {
        const query = await db.query(`INSERT INTO chat_list(unique_id, sender_id, receiver_id, receiver_name, unread, last_message) VALUE(?,?,?, ?, ?, ?)`, [
            this.unique_id,
            this.sender_id,
            this.receiver_id,
            this.receiver_name,
            this.unread,
            this.last_message
        ]);
        return query;
    }

    async update(unique_id) {
        const query = await db.query('UPDATE chat_list SET sender_id=?, receiver_id =?, receiver_name = ?, unread = ?, last_message = ? WHERE unique_id =? ', [
            this.sender_id,
            this.receiver_id,
            this.receiver_name,
            this.unread,
            this.last_message,
            unique_id
        ]);
        return query;
    }
    async delete(unique_id){
        const query = await db.query(`DELETE FROM chat_list WHERE unique_id = ?`, [unique_id]);
        return query;
    }



}

module.exports = chatlist;