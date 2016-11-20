/**
 * Created by Tomkk on 2016/11/18.
 */
const mysql = require('mysql');
const Promise  = require('bluebird');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'root',
    port            : '3306',
    database        : 'google_auth'
});
// var conn = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'root',
//     database:'google_auth',
//     port:3306
// })
// conn.connect();
pool.on('connection', function (connection) {
    console.log("建立了一个连接");
});
pool.on('error', function (error) {
    console.error("发生未处理错误：" + error);
});
var queryAsync = Promise.promisify(pool.query, {context: pool, multiArgs: true});
const createSql = "CREATE TABLE IF NOT EXISTS user("+
                        "id INT PRIMARY KEY AUTO_INCREMENT,"+
                        "username VARCHAR(255) NOT NULL ,"+
                        "create_date TIMESTAMP NULL DEFAULT now(),"+
                        "password TEXT NOT NULL " +
                    ")ENGINE=InnoDB DEFAULT CHARSET=utf8;";

module.exports.queryAsync = queryAsync;