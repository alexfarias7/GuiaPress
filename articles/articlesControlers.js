import express, { Router } from "express";
import CategoryModel from "../categories/Category.js";
import ArticleModel from "./Article.js";
import slugify from "slugify";
import { adminAuth } from "../midlewares/adminAuth.js";
const routerArticles = express.Router()

routerArticles.get('/admin/articles', adminAuth, (req, res)=>{

    ArticleModel.findAll({
        include:[{model:CategoryModel}]
    }).then(articles=>{
        res.render('admin/articles/index', {articles:articles})
    })
})
routerArticles.get('/admin/articles/new/',adminAuth, (req, res)=>{
    CategoryModel.findAll().then(categories=>{
        res.render('admin/articles/new', {categories:categories})
    })
    
})

routerArticles.post('/articles/save', adminAuth,(req, res)=>{
    const title = req.body.title
    const body= req.body.body
    const category= req.body.category

    ArticleModel.create({
        title:title,
        slug: slugify(title),
        body:body,
        categoryId: category
    }).then(()=>{
        res.redirect('/admin/articles')
    })
})

routerArticles.post('/articles/delete' ,adminAuth, (req, res)=>{
    const id = req.body.id

    if(id!== undefined){
     
      if(!isNaN(id)){
          ArticleModel.destroy({
              where:{
                  id:id
              }
          }).then(()=>{
              res.redirect('/admin/articles')
          })

      }else res.redirect('/admin/articles')
    }else res.redirect('/admin/articles')
})

routerArticles.get('/admin/articles/edit/:id',adminAuth ,(req, res)=>{
    const id =req.params.id
    ArticleModel.findByPk(id).then(article=>{
        if(article!= undefined){
            CategoryModel.findAll().then(categories=>{
                res.render('admin/articles/edit', {categories:categories,article:article})
            })
        }else res.redirect('/')
    }).catch(erro=> res.redirect('/'))    

})

routerArticles.post('/articles/update', adminAuth,(req,res)=>{
    const id =req.body.id;
    const title= req.body.title
    const body= req.body.body
    const category=req.body.category

    ArticleModel.update({title:title, body:body, categoryId:category, slug:slugify(title)},{
        where:{
            id:id
        }
    }).then(()=>res.redirect('/admin/articles'))
    .catch( erro=> res.redirect('/'))
})

routerArticles.get('/articles/page/:num',(req, res)=>{
    let page= req.params.num
    
    let offset=0
    if(isNaN(page) || page==1) offset=0
    else offset=parseInt(page)*4-4

    ArticleModel.findAndCountAll({
        limit:4,
        offset:offset,
        order:[
            ['id','DESC']
        ]
    }).then(articles=>{
        let next
        if(offset + 4>=articles.count) next=false
        else next =true

        let result ={
            page:parseInt(page),
            next:next,
            articles:articles,
        }

        CategoryModel.findAll()
        .then(categories => {
          res.render("admin/articles/page", {
            result: result,
            categories: categories
          });
        })
    })
})
export default routerArticles