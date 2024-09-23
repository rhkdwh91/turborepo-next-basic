import mysql from "mysql2/promise";

let conn: mysql.Connection;

export async function connectDb() {
  if (conn) return conn;
  conn = await mysql.createConnection({
    host: `${process.env.HOST}`,
    port: Number(`${process.env.PORT}`),
    user: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`,
    connectTimeout: 60000, // 60초
  });

  console.log(conn);
  return conn;
}
