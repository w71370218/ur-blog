import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        uniquired: true
    },
    name: {
        type: String,
        required: true,
        uniquired: true,
    },
    description: {
        type: String,
    },
    createdTime: {
        type: String,
        default: new Date().toString()
    },
    updatedTime: {
        type: String,
        default: new Date().toString()
    },
    cover: {
        url: {
            type: String,
        },
        alt: {
            type: String,
        }
    },
})

export default mongoose.models['series'] || mongoose.model('series', seriesSchema);