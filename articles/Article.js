import { Sequelize } from "sequelize";

import connection from "../database/database.js"
import CategoryModel from "../categories/Category.js";

const ArticleModel= connection.define('articles',{
    title:{
        type:Sequelize.STRING,
        allowNull:false
    }, slug:{
     type:Sequelize.STRING,
     allowNull:false
    },
    body:{
        type:Sequelize.TEXT,
        allowNull:false
    }
})
CategoryModel.hasMany(ArticleModel)//* uma categoria tem muitos artigos

ArticleModel.belongsTo(CategoryModel)//* UM ARTIGO PERTENCE A UMA CATEGORIA
//ArticleModel.sync({force:true})

export default ArticleModel