const mysql = require('mysql');

const pool = mysql.createPool({
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'rtai_crypto_wallet',
    connectionLimit: 10,
    supportBigNumbers: true
});

exports.request = (sqlRequest, callback) => {
  pool.getConnection((err, connection) => {
    if(err) { callback(err); return; }
    connection.query(sqlRequest, (err, results) => {
      connection.release();
      if(err) { callback(err); return; }
      callback(false, results);
    });
  });
};