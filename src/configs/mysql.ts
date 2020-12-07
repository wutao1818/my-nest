const mysql = require('mysql2');

const connection = mysql.createConnection({
  port: 3306,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database : 'wzry',
  connectionLimit: 10,
});

console.log(`connect mysql successed!`);

export default connection;
