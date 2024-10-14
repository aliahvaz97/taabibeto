const pool = require('../utilities/database')

class UsersModel {
    static getUser = async(id) => {
        const [result] = await pool.query('select * from user_db where Id=?',[id]);
        return result[0];
        };

};

module.exports = UsersModel;