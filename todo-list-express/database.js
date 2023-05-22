const mysql = require('mysql2');

let db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: '',
    password: '',
    database: 'todolist',
});

try {
    db.connect();
    console.log("Connected to MySQL database");
}
catch(err) {
    console.log(err);
}

module.exports = db;