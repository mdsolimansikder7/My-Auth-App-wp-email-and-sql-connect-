
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 26601),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "defaultdb",
  ssl: {
    rejectUnauthorized: true,
  },
  connectTimeout: 15000,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

export default db;
