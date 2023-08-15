import pkg from 'pg'
import dotenv from "dotenv";


dotenv.config()

const {Pool} = pkg

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require"
    // user: "postgres",
    // password: "dallas",
    // host: "localhost",
    // database: "travel_booking",
    // port: 5432,
});
  
pool.connect((err)=>{
    if(err) throw err
    console.log("Database connected")
})

export default {
    query:(text:string,params?:any[])=>pool.query(text,params)
}