import mysql from "mysql2/promise";

let conn: mysql.Connection;

export async function connectDb() {
  if (conn) return conn;
  conn = await mysql.createConnection({
    host: "3.36.119.147",
    port: 3306,
    user: "root",
    password: "vlzkcb12!@",
    database: "klog",
  });
  return conn;
}
