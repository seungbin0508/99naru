import mongoose from 'mongoose'

export const commentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Post'
	},
	created_at: {
		type: Date,
		default: Date.now
	}
})

export default mongoose.model('Comment', commentSchema)