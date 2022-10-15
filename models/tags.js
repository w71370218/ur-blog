import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        uniquired: true
    },
    name: {
        type: String,
        required: true,
        uniquired: true
    },
    createdTime: {
        type: String,
        default: new Date().toString()
    },
    updatedTime: {
        type: String,
        default: new Date().toString()
    }
})

export default mongoose.models['tags'] || mongoose.model('tags', tagSchema);