const mysql = require('mysql2/promise');
// const dotenv = require('dotenv');
// const SSL = require('../../BaltimoreCyberTrustRoot.crt.pem');
// dotenv.config();
// // ^^^ injects the dotenv package into our project configuration
// // process.env now has the keys and values defined in .env
// const {
//   DB_USER,
//   DB_PASS,
//   DB_NAME,
//   DB_HOST,
//   DB_PORT,
//   CLOUD_SQL_CONNECTION_NAME,
// } = process.env;
// const config = {
//   user: DB_USER,
//   password: DB_PASS,
//   database: DB_NAME,
//   host: DB_HOST,
//   port: DB_PORT,
//   socketPath: `/cloudsql/${CLOUD_SQL_CONNECTION_NAME}`,
// };
// const connection = mysql.createConnection(config);
// console.log(CLOUD_SQL_CONNECTION_NAME);
// // create connection
// connection.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(`Connected to database ${DB_NAME}`);
//   }
// });
const db_name = process.env.DB_NAME || 'wswe';
const db_pass = process.env.DB_PASS || '';
const db_user = process.env.DB_USER || 'root';
const db_host = process.env.DB_HOST || 'localhost';
let pool;
const createPool = async () => {
  pool = mysql.createPool({
    user: db_user,
    password: db_pass,
    database: db_name,
    host: db_host,
  });
};
createPool().then(() => {
  // console.log('connected to cloud sql db');
  console.log(`connected to locat db ${db_name}`);
});
// module.exports.connection = connection;
module.exports.pool = pool;
