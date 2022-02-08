import express from "express";

import bcrypt from "bcryptjs"

import UserModel from "./userModal.js";

const routerUser = express.Router()



routerUser.get('/admin/users', (req, res)=>{
    UserModel.findAll().then(users=>{
        res.render('admin/users/index',{users:users})
    })
 
})


routerUser.get('/admin/users/create', (req,res)=>{
    res.render('admin/users/create')

    
})

routerUser.post('/users/create', (req,res)=>{


    
    let { email, password } = req.body; // recebendo dados do form
    let salt = bcrypt.genSaltSync(10); // Salt para "aumentar" a segurança da criptografia
    let hash = bcrypt.hashSync(password, salt); // cryptografando a senha
    
    UserModel.findOne({where:{email:email}}).then(user=>{
        if(user==undefined){
            UserModel.create({
                email: email,
                password: hash
              }).then(() => res.redirect("/"))
                .catch(error => res.redirect("/"))

        }else res.redirect('/admin/users/create')
    })

})

routerUser.get('/login', (req, res)=>{
    res.render('admin/users/login')
})

routerUser.post('/authenticate', (req, res)=>{
    const email= req.body.email
    const password= req.body.password
    UserModel.findOne({where:{email:email}}).then(user=>{
        if(user != undefined){//*se existe um usuario com esse email
            //* valida a sennha
            const correct=bcrypt.compareSync(password, user.password)
            if (correct) {
                req.session.user={
                    id:user.id,
                    email:user.email
                }
                res.redirect('/admin/articles')

            }else res.redirect('/login')
        }else res.redirect('/login')
    })
})

routerUser.get('/logout', (req, res)=>{
    req.session.user=undefined
    res.redirect('/')
})
export default routerUser