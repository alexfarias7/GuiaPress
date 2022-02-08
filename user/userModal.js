import { Sequelize } from "sequelize";

import connection from "../database/database.js"

const UserModel= connection.define('users',{
    email:{
        type:Sequelize.STRING,
        allowNull:false
    }, password:{
     type:Sequelize.STRING,
     allowNull:false
    }
})

//UserModel.sync({force:true})
export default UserModel