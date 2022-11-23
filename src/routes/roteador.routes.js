import {Router} from 'express'
import emailModel from '../models/email.js'
import userModel from '../models/user.js'

const roteador = Router()

roteador.get('/register/:email', async (req,res)=>{
    const {email} = req.params 
    if(!email) return res.status(400).json({mensagem:"envie um email"})

    let emailObj = new emailModel({
        email: email
    })

    let registro = await emailObj.save().then( async (doc) => {
        console.log(doc)
        return doc
      })
      .catch(err =>{return err})

      if(registro.errors) return res.status(500).json({
        mensagem:"Não foi possível cadastar esse email!",
        email,
        error: registro.errors
      })

    return res.status(200).json(registro)
})

roteador.get('/find/:email', async (req,res)=>{
    const {email} = req.params

    if(!email) return res.status(400).json({mensagem:"envie um email"})

    let registro_array = await emailModel.find({
        email: email
    })
    .then( async (doc) => {
        console.log(doc)
        return doc
    })

    return res.status(200).json(registro_array)
})

roteador.get('/update/:email/:novo_email', async (req,res)=>{
    const {email,novo_email} = req.params

    if(!email) return res.status(400).json({mensagem:"envie um email"})

    let registro_novo = await emailModel.findOneAndUpdate(
        {
          email: email
        }, 
        {
          email: novo_email   // campo a ser atualizado
        },
        {
          new: true,                       // retorne o doc atualizado
          runValidators: true              // valide antes de atualizar
        }
    )
    .then( async (doc) => {
        console.log(doc)
        return doc
    })
    .catch(err =>{return err})

      if(registro_novo.errors) return res.status(500).json({
        mensagem:"Não foi possível cadastar esse email!",
        email,
        error: registro_novo.errors
      }
    )

    if(!registro_novo) return res.status(400).send('Não consegui atualizar!')

    return res.status(200).json(registro_novo)
})

roteador.delete('/delete/:email', async (req,res)=>{
  const {email} = req.params

  if(!email) return res.status(400).json({mensagem:"envie um email"});

  const registro = await emailModel.findOneAndRemove({
      email: email
    }
  )
  .then(response => {
      console.log(response)
      return response
    }
  )
  .catch(err => {
      console.error(err)
      return err
    }
  )

  if(!registro) return res.status(404).json({mensagem:"Registro não encontrado para exclusão!"})
  return res.status(200).json(registro)
})

roteador.get('/user/:name', async (req,res)=>{
  const {name} = req.params
  
  const user = new userModel({
    fullName: name
  })

  // user.fullName = name



  user.save() //é aqui que eu REALMENTE vou escrever o dado no banco

  const usuariosBase = await userModel.getUsers().then(docs => {
    console.log(docs)
    return docs
  })
  .catch(err => {
    console.error(err)
    return err
  })

  console.log(user.toJSON())
  console.log(user.fullName)
  // console.log(user.getInitials())
  console.log(usuariosBase)

  return res.status(200).json(user)
})

roteador.get('/user', async (req,res)=>{
  // const usuariosBase = await userModel.getUsers().then(docs => {
  //   console.log(docs)
  //   return docs
  // })
  // .catch(err => {
  //   console.error(err)
  //   return err
  // })

  // console.log(usuariosBase)

  const usuario = userModel.find()                   // encontra todos os usuários
  .skip(100)                // pula os primeiros 100 registos
  .limit(10)                // limita a 10 itens
  .sort({firstName: 1})      // ordena firstName de forma ascendente
  .select({firstName: true}) // seleciona firstName apenas
  .exec()                   // executa a busca
  .then(docs => {
    console.log(docs)
    return docs
  })
  .catch(err => {
    console.error(err)
    return err
  })

  const usuariosBase = await userModel.find()

  return res.status(200).json(usuariosBase)
})

export default roteador
