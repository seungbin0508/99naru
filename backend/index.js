import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import router from './api/index.js'

dotenv.config()
const app = express()
const server = http.createServer(app)

app.use(router)
server.listen(3000, () => {
    console.log('서버가 요청을 받을 준비가 됐어요');
  });