import { Sequelize } from "sequelize";

import connection from "../database/database.js"

const CategoryModel= connection.define('categories',{
    title:{
        type:Sequelize.STRING,
        allowNull:false
    }, slug:{
     type:Sequelize.STRING,
     allowNull:false
    }
})

//CategoryModel.sync({force:true})
export default CategoryModel