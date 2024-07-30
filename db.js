import {mongoose, Schema} from 'mongoose'
import {getNamespace} from 'node-request-context'

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@db:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`)

const userSchema = new Schema({
  name: String,
  email: String,
  password: String
});

export const User = mongoose.model('user', userSchema)

const appSchema = new Schema({
  name: String,
  owner: {type: mongoose.Types.ObjectId, ref: "user"}
})

export const App = mongoose.model('app',appSchema)

/*
userSchema.pre('save', (next) => {
  const ns = getNamespace('app')
  ns.get('req')
  next()
})
*/

