const pool = require('../utilities/database')

class UsersModel {
    static insertUser = async(fullname,phonenumber,password) => {
        const [result] = await pool.query('insert into users (Id,FullName,PhoneNumber,Password) values(uuid(),?,?,?)',
            [fullname,phonenumber,password]);
        return result
    };
    static getUserByPhoneNumber = async(phonenumber) => {
        const [result] = await pool.query('select * from users where PhoneNumber=?',[phonenumber]);
        return result[0];
        };
   
};

module.exports = UsersModel;