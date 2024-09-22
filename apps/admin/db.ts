import mysql from "mysql2/promise";

let conn: mysql.Connection;

export async function connectDb() {
  if (conn) return conn;
  conn = await mysql.createConnection({
    host: `${process.env.HOST}`,
    port: `${process.env.PORT}`,
    user: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`,
  });
  return conn;
}
