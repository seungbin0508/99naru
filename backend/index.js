import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './api/index.js'
import multer from 'multer'
import { Server } from 'socket.io'
import './models/index.js'

dotenv.config()
const app = express()
const server = http.createServer(app)
export const io = new Server(server)

app.use(cors())
app.use(multer().none())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', router)

//todo testCode for news crawl
import './crawl/index.js'
server.listen(process.env.PORT || 3000, () => {
	console.log('서버 연결')
})
