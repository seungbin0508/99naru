import mongoose from 'mongoose'
import { commentSchema } from './comment.js'

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
	comments: [
		// Subdocument can hold up to 16MB, which is about 68,000 100-character comments
		// Thus it's safe to use here
		commentSchema
	]
	/*
	likedUsers: [User] // count the number of liked users by implementing a method
	 */
})
//
// postSchema.method('getLikedUsersNumber',function(doc) {
// 	return doc.likedUsers.length
// })

export default mongoose.model('Post', postSchema)