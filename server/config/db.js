const mongoose = require('mongoose')

mongoose
    .connect(process.env.mongodbURI)
    .then(() => console.log('mongodb connected'))
    .catch((e) => console.error(`error connecting mongodb ${e.message}`))

const TodoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    completed: Boolean
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = {
    Todo
}