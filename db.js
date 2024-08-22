const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'laravel_eloquent'
});

db.connect((err) => {
    if (err) 
        {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
        }
    console.log('Connected to MySQL database as id ' + db.threadId);
});

module.exports = { db }

