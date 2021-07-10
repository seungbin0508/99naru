import mongoose from 'mongoose'
import { commentSchema } from './comment.js'
import { userSchema } from './user.js'

const postSchema = new mongoose.Schema({
	text: {
		type: String,
		require: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	// Subdocument can hold up to 16MB, which is about 68,000 100-character comments
	// Thus it's safe to use here
	comments: [commentSchema],
	// count the number of liked users by implementing a method
	likedUsers: [userSchema]
})

export default mongoose.model('Post', postSchema)