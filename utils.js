import {appendFileSync} from 'fs'
import {createNamespace} from 'node-request-context';
import {v4 as uuidv4} from 'uuid'

global.log = (str) => appendFileSync('log', '['+new Date().toISOString()+'] '+str+"\n")

const namespace = createNamespace('app');

export const dbTrackerMiddleware = (req,res,next) => {
  const tid = uuidv4()
  namespace.run(() => {
    namespace.set('tid', tid)
    namespace.set('req', req)
    next()
  })
}
