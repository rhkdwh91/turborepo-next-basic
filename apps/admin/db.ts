import mysql from "mysql2/promise";

let conn: mysql.Connection;

export async function connectDb() {
  if (conn) return conn;

  conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectTimeout: 60000, // 60초
  });

  return conn;
}
