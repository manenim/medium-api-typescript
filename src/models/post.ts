import mongoose, { Schema } from 'mongoose'
import { IPost } from '../interfaces/postInterface'

const PostSchema = new Schema({
    title: String,
    description: String,
    body: String,
    date: { type: Date, default: Date.now },
    tags: [String],
    comments: [{ body: String, date: Date }],
    hidden: Boolean,
    meta: {
        likes: Number,
    },
})

export default mongoose.model<IPost>('PostModel', PostSchema)
