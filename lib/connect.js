import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
    throw new Error('Plaese add your Mongo URI to .env.local');
}
/*
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}
*/
const connect = () => {
    if (mongoose.connections[0].readyState) {
        console.log('Already connected');
        return;
    }
    mongoose.connect(process.env.MONGODB_URI.replace('?', 'ur-blog?'), {}, err => {
        if (err) throw err;
        console.log('Connected!')
    })

}
export default connect;