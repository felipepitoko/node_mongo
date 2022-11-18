import express from 'express'
import database from './database/database.js'
import emailModel from './models/email.js'

class Server{
    constructor(){
        this.serverConfig()
        this.criarEmail()
        database
    }

    serverConfig(){
        this.app = express().listen(3000,()=>{
            console.log('Escutando a porta 3000')
        })
    }

    criarEmail(){
        let msg = new emailModel({
            email: 'ADA.LOVELACE@GMAIL.COM'
          })
          
        msg.save()
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })
    }
}

export default new Server()