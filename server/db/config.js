
const mysql = require('mysql');
const dotenv = require('dotenv');
// const SSL = require('../../BaltimoreCyberTrustRoot.crt.pem');

dotenv.config();
// ^^^ injects the dotenv package into our project configuration
// process.env now has the keys and values defined in .env

const {
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  CLOUD_SQL_CONNECTION_NAME,
} = process.env;

const config = {
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  socketPath: `/cloudsql/${CLOUD_SQL_CONNECTION_NAME}`,
};

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


let pool;
const createPool = async () => {
  pool = mysql.createPool({
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    // If connecting via unix domain socket, specify the path
    socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
    // If connecting via TCP, enter the IP and port instead
    // host: 'localhost',
    // port: 3306,
  });
};
createPool().then(() => {
  console.log('hey');
});


// module.exports.connection = connection;
module.exports.pool = pool;
