import {User} from '../db.js'
import express from 'express'

const router = express.Router()

router.get('/',async(req,res) => {
  res.send(await User.find({}))
})

router.get('/:id', async(req,res) => {
  const u = await User.findById(req.params.id)
  res.send(u.toJSON())
})

router.post('/', (req,res) => {
  const u = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })

  u.save().then(u => res.json(u.toJSON()) )
})

export default router
