const db = require('../../../configs/database');

class chat{
    constructor(
        chatUq_id,
        who,
        message
    ){
        this.chatUq_id = chatUq_id;
        this.who = who;
        this.message = message;
    
    }
    async findAll() {
        let sql = `SELECT * FROM chat`;
        let query = await db.query(sql);
        return query.length == 0 ? null : query[0];
    }

    async findOne(chatUq_id) {
        let sql = `SELECT * FROM chat WHERE chatUq_id = ?`;
        let query = await db.query(sql, [chatUq_id]);
        return query[0][0];

    }

    async insert() {
        const query = await db.query(`INSERT INTO chat(chatUq_id, who = ?, message = ?) VALUE(?, ?, ?)`, [
            this.chatUq_id,
            this.who,
            this.message
        ]);
        return query;
    }

    async insertMultiple(chatUq_id, who, message) {
        let sql = 'INSERT INTO chat(chatUq_id, who, message) VALUE';
        for (let index = 0; index < chatUq_id.length; index++) {
            sql += "('" + chatUq_id[index] + "'," + who + ","+message+"),"
        }

        let addChat = sql.replace(/.$/, ";");
    

        await db.query([chatUq_id]);
        const query = await db.query(addChat);
        return query;
    }

}
module.exports = chat;