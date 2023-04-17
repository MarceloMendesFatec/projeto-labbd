
import dotenv from "dotenv/config"

export const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
      encrypt: false,
      trustServerCertificate: true,
       
    }
}

