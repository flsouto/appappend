import 'dotenv/config'
import axios from 'axios'
import { createClient } from 'redis'
import { execSync } from 'child_process'

global.api = axios.create({
  baseURL: `http://localhost:${process.env.APP_PORT}`
})

api.interceptors.response.use(
  res => res,
  e => {
    console.log(e)
    return e
  }
)

let redisClient = null
global.redis = async() => {
  if(!redisClient){
    redisClient = await createClient({url:"redis://redis"}).connect()
  }
  return redisClient
}

global.cache = async(data) => {
  const key = expect.getState().currentTestName
  const client = await redis();
  await client.set(key, JSON.stringify(data))
}

global.run = async(test) => {
  const client = await redis()
  let data = await client.get(test)
  if(process.env.CLEAR || !data){
    execSync(`npm run test '${test}'`)
  }
  data = await client.get(test)
  return JSON.parse(data)
}

afterAll(async() => {
  (await redis()).disconnect()
})
