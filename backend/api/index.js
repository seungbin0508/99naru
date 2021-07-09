import express from 'express'
import postsRouter from './posts.js'
import commentsRouter from './comments'
import usersRouter from './users'


const router = express.Router()

router.use('/posts', postsRouter)
router.use('/comments', commentsRouter)
router.use('/signup', usersRouter)

export default router