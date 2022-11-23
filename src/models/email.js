import mongoose, { Schema } from 'mongoose';
import validator from 'validator'

const emailSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value)
    }
  }
})

const emailModel = mongoose.model('Email', emailSchema)
  
export const schema = emailModel.schema;
export default emailModel