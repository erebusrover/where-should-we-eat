
const mysql = require('mysql');
const dotenv = require('dotenv');
// const SSL = require('../../BaltimoreCyberTrustRoot.crt.pem');

dotenv.config();
// ^^^ injects the dotenv package into our project configuration
// process.env now has the keys and values defined in .env

// const {
//   DB_HOST,
//   DB_PORT,
//   DB_USER,
//   USER_PASS,
//   DATABASE,
// } = process.env;

// Database Connection for Production

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

// if (process.env.CLOUD_SQL_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
//   config.socketPath = `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`;
//   console.log('connected');
// }

// const connection = mysql.createConnection(config);


// [START cloud_sql_mysql_mysql_create]
let pool;
const createPool = async () => {
  pool = await mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    // If connecting via unix domain socket, specify the path
    socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
    // If connecting via TCP, enter the IP and port instead
    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
  });
};
createPool().then(() => {
  console.log(`connected to ${process.env.DB_NAME}???`);
});

// const ensureSchema = async () => {
//   // Wait for tables to be created (if they don't already exist).
//   await pool.query(
//     `CREATE TABLE IF NOT EXISTS votes
//       ( vote_id SERIAL NOT NULL, time_cast timestamp NOT NULL,
//       candidate CHAR(6) NOT NULL, PRIMARY KEY (vote_id) );`,
//   );
// };
// ensureSchema();


// module.exports.connection = connection;
module.exports.pool = createPool;
