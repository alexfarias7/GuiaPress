//*bibliotecas
import express from "express";
import session from "express-session"

//* funções
import connection from "./database/database.js";
//* contriollers
import router from "./categories/categoriesController.js";
import routerArticles from "./articles/articlesControlers.js";
import routerUser from "./user/userControler.js";
//*Models
import ArticleModel from "./articles/Article.js";
import CategoryModel from "./categories/Category.js";

const app = express()

import slugify from "slugify";

//* Session
app.use(session({
    secret:'palavra aleatória rsrsrs',
    cookie:{maxAge:1000000}
}))
//* View Engine do Projeto
app.set('view engine','ejs')

//* arquivos estáticos
app.use(express.static('public'))


//*Body Parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//*Database
connection
.authenticate()
.then(()=>{
    console.log('conexão feita com sucesso')
})
.catch((error)=>{
    console.log(error)
})

//*rotas  controllers
app.use('/', router)
app.use('/', routerArticles)
app.use('/', routerUser)



//* pagina inicial
app.get("/", (req, res)=>{
    ArticleModel.findAll({
        order:[
            ['id','DESC']
        ],
        limit:4
    }).then(articles=>{
        CategoryModel.findAll().then(categories=>{
            res.render('index', {articles:articles, categories:categories})
        })
    })
 
})

app.get('/:slug', (req, res)=>{
    const slug =req.params.slug
   ArticleModel.findOne({
       where:{
           slug:slug
       }
   }).then(article=>{
       if(article!= undefined){
        CategoryModel.findAll().then(categories=>{
            res.render('article', {article:article, categories:categories})
        })
       } else res.redirect('/')
   }).catch(err=> res.redirect('/'))
}) 

app.get('/category/:slug',(req,res)=>{
    const slug = req.params.slug
    CategoryModel.findOne({
        where:{
            slug:slug
        }, 
        include:[{model:ArticleModel}]
    }).then(category=>{
        if(category!=undefined){
            CategoryModel.findAll().then(categories=>{
                res.render('index',{articles:category.articles, categories:categories})
            })

        }else res.redirect('/')

    }).catch(err=> res.redirect('/'))
})

app.listen(8080, ()=>{
    console.log("servidor rodando")
})