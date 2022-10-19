import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        uniquired: true
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },

    publishedTime: {
        type: String,
        default: new Date().toString()
    },
    updatedTime: {
        type: String,
        default: new Date().toString()
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tags' }],
    access: {
        type: String,
        default: "any"
    },
    cover: {
        url: {
            type: String,
        },
        alt: {
            type: String,
        }
    },
    siries: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'siries'
    }

})

export default mongoose.models['posts'] || mongoose.model('posts', postSchema);