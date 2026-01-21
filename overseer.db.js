import mysql from 'mysql'
import 'dotenv/config'

export default mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPWD,
  database: process.env.DBNAME,
  charset: 'utf8mb4'
})