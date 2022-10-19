import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        uniquired: true
    },
    password: {
        type: String,
        require: true
    },
    id: {
        type: Number,
        require: true,
        uniquired: true
    },
    role: {
        type: String,
        required: true,
    },
    createdTime: {
        type: String,
        required: true,
        default: new Date().toString()
    },
    lastLoginTime: {
        type: String,
        required: true,
        default: new Date().toString()
    }

});

let Dataset = mongoose.models['users'] || mongoose.model('users', userSchema);
export default Dataset;