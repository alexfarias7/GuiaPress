import {Sequelize}  from "sequelize";
import dotenv from "dotenv";

const datas = dotenv.config()

const connection = new Sequelize('guiapress', process.env.DBUSER, process.env.DBPASSWORD,{
    host:'localhost',
    dialect:'mysql',
    port:3306,
    timezone:'-04:00'
    
})

export default connection