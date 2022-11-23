import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    birthdate: String,
    createdAt: Date,
    updatedAt: Date
})

userSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName
})

userSchema.virtual('fullName').set(function (name) {
    let separar = String(name).split(' ')

    this.firstName = separar[0]
    this.lastName = separar[1]
})

userSchema.methods.getInitials = function(){
    return this.firstName[0].toUpperCase() + this.lastName[0].toUpperCase()
}

userSchema.statics.getUsers = async function() {
    return new Promise((resolve, reject) => {
      this.find((err, docs) => {
        if(err) {
          console.error(err)
          return reject(err)
        }
        console.log(docs)
        resolve(docs)
      })
    }
    )
}

userSchema.pre('save', function (next) {
    let now = Date.now()
     
    this.updatedAt = now
    // Define o valor para createdAt apenas se ele for nulo
    if (!this.createdAt) {
      this.createdAt = now
    }
    
    // Chama a próxima função na cadeia de pre-save
    next()    
  }
)

const userModel = model('User', userSchema)

export const schema = userModel.schema;
export default userModel