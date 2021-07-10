import express from 'express'
import Post from '../models/post.js'

const router = express.Router()

router.put('/:postId', (req, res) => {
	const { postId } = req.params
	const { text } = req.body
	Post.findByIdAndUpdate(postId, text).exec().then(() => {
		res.sendStatus(200)
	}).catch(err => {
		console.error(err)
		res.send(400).json({
			errorMessage: '게시글 수정을 실패했습니다.'
		})
	})
})
router.delete('/:postId', (req, res) => {
	const { postId } = req.params
	Post.findByIdAndDelete(postId).exec().then(() => {
		res.sendStatus(200)
	}).catch(err => {
		console.error(err)
		res.send(400).json({
			errorMessage: '게시글 삭제를 실패했습니다.'
		})
	})
})
router.get('/', (req, res) => {
	Post.find().populate('comments').exec().then(posts => {
		res.send(posts)
	}).catch(err => {
		console.error(err)
		res.send(400).json({
			errorMessage: '게시물 목록을 가져오기를 실패했습니다.'
		})
	})
})
router.post('/', (req, res) => {
	//todo: load user info from res.locals created by token
	//const userId = null
	//const userId = 'test'
	Post.create(req.body).then(() => {
		res.sendStatus(201)
	}).catch(err => {
		console.error(err)
		res.status(400).json({
			errorMessage: '게시물 작성을 실패했습니다.'
		})
	})
})
export default router