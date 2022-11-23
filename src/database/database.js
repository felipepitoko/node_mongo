import mongoose from "mongoose";

class Database{
    constructor(){
        this.conection()
    }

    async conection(){
        mongoose.connect(process.env.MONGO_KEY)
        .then(()=>{
            console.log('Conectado ao MongoDB!')
        })
        .catch(error =>{
            console.log(error)
        })
    }
}

export default new Database()