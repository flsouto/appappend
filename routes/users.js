import {User, App} from '../db.js'
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

router.post('/:id/apps', async(req,res) => {
  const app = new App({
    name: req.body.name,
    owner: req.params.id
  })
  app.save().then(o => res.json(o.toJSON()))
})

router.get('/:owner/apps/:id', async(req,res) => {
  res.send(
    (await App.findById(req.params.id)).toJSON()
  )
})

router.get('/:owner/apps', async(req,res) => {
  res.send(await App.find({owner: req.params.owner}))
})

export default router
