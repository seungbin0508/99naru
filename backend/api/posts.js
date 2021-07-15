import express from 'express'
import Post from '../models/post.js'

const router = express.Router()

router.put('/:postId/like', (req, res) => {
	const { postId } = req.params
	const { userId } = res.locals
	Post.findById(postId).exec().then(post => {
		const { likedUsers } = post
		likedUsers.push(userId)
		post.save().then(() => res.sendStatus(200))
	})
})
router.put('/:postId/unlike', (req, res) => {
	const { postId } = req.params
	const { userId } = res.locals
	Post.findById(postId).exec().then(post => {
		const { likedUsers } = post
		likedUsers.id(userId).remove()
		post.save().then(() => { res.sendStatus(200) })
	})
})

router.put('/:postId', (req, res) => {
	const { postId } = req.params
	const { text } = req.body
	Post.findByIdAndUpdate(postId, { text }).exec().then(() => {
		res.sendStatus(200)
	}).catch((err) => {
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
	}).catch((err) => {
		console.error(err)
		res.send(400).json({
			errorMessage: '게시글 삭제를 실패했습니다.'
		})
	})
})
router.get('/', (req, res) => {
	Post.find().populate({
		path: 'comments',
		populate: {
			path: 'userId',
			select: '-password'
		}
	}).populate('userId', '-password').sort('-created_at').exec().
		then((posts) => {
			res.send(posts)
		}).
		catch((err) => {
			console.error(err)
			res.send(400).json({
				errorMessage: '게시물 목록을 가져오기를 실패했습니다.'
			})
		})
})
router.post('/', (req, res) => {
	console.log('req.body test', req.body)
	const { text } = req.body
	const { userId } = res.locals
	Post.create({ text, userId }).then(() => {
		res.sendStatus(201)
	}).catch((err) => {
		console.error(err)
		res.status(400).json({
			errorMessage: '게시물 작성을 실패했습니다.'
		})
	})
})
export default router
