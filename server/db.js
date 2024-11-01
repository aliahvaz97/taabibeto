// db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', // آدرس سرور پایگاه داده
  user: 'your_username', // نام کاربری پایگاه داده
  password: 'your_password', // رمز عبور پایگاه داده
  database: 'your_database_name', // نام پایگاه داده
});

// اتصال به پایگاه داده
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = connection;
