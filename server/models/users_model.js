const pool = require('../utilities/database')

class UsersModel {
    static getUser = async(id) => {
        const [result] = await pool.query('select * from user_db where Id=?',[id]);
        return result[0];
        };
    static insertUser = async(full_name,phone_number) => {
        const [result] = await pool.query('insert into user_db (full_name,phone_number) value(?,?)',[full_name,phone_number]);
        console.log(result.insertId)
        return result
    };
};

module.exports = UsersModel;