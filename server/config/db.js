const mongoose = require('mongoose')

mongoose
    .connect(process.env.mongodbURI)
    .then(() => console.log('mongodb connected'))
    .catch((e) => console.error(`error connecting mongodb ${e.message}`))

const TodoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    completed: {type: Boolean}
})

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    isAdmin: Boolean
})

const Todo = mongoose.model('Todo', TodoSchema)
const User = mongoose.model('User', UserSchema)

module.exports = {
    Todo,
    User
}