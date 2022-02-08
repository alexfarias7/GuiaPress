import express from "express";
import CategoryModel from "./Category.js";
import slugify from "slugify";

const router = express.Router()

router.get('/admin/categories/new', (req,res)=>{
    res.render('admin/categories/new')
})


router.post("/categories/save", (req, res) => {
    const title = req.body.title;
    if (title != undefined) {
      CategoryModel.create({
        title: title,
        slug: slugify(title)
      })
        .then(() => {
          res.redirect("/admin/categories");
        })
        .catch(error => {
          res.status(404).json({
            msg: "Error ao salvar titulo de categoria",
            error: error
          });
        });
    } else {
      res.redirect("/categories/admin/categories/new");
    }
  });

  router.get('/admin/categories', (req,res)=>{

    CategoryModel.findAll().then(categories=>{
        res.render('admin/categories/index',{categories:categories})
    })
  })

  router.post('/categories/delete' , (req, res)=>{
      const id = req.body.id

      if(id!== undefined){
       
        if(!isNaN(id)){
            CategoryModel.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect('/admin/categories')
            })

        }else res.redirect('/admin/categories')
      }else res.redirect('/admin/categories')
  })

  router.get('/admin/categories/edit/:id', (req, res)=>{ 
   const id= req.params.id
    if (isNaN(id)) res.redirect('/admin/categories')

    CategoryModel.findByPk(id).then(categgory=>{
      if (categgory!=undefined) res.render('admin/categories/edit', {category:categgory})
      else res.redirect('/admin/categories')
    }).catch(error => res.redirect('/admin/categories'))
  })

  router.post('/categories/update', (req, res)=>{
    const id = req.body.id
    const title = req.body.title 

    CategoryModel.update({title:title, slug:slugify(title)},{
      where:{
        id:id
      }
    }).then(()=>{
      res.redirect('/admin/categories')
    })
  })
export default router