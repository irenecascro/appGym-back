const mysql = require('mysql2');

// mysql://USER:PASS@HOST:PORT/DB_NAME
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'mysqlpassword',
    port: 3306,
    database: 'gimnasio'
});

connection.connect((err) => {
    connection.query('SELECT * FROM clientes', (err, result) => {
        console.log(err);
        console.log(result);
        connection.destroy();
    });
});