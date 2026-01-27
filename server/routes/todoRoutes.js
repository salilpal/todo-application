const router = require('express').Router()
const { Todo } = require('../config/db')

router.post('/', async (req, res) => {
    const {title, description} = req.body
    try {
        const todo = await Todo.create({
            title: title,
            description: description,
            completed: false
        })
        return res.status(201).json({
            msg: 'Todo created successfully',
            todo: todo
        })
    } catch (e) {
        return res.status(400).json({
            msg: 'error creating todo',
            error: e.message
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({})
        return res.status(201).json({
            todos: todos
        })
    } catch (e) {
        return res.status(401).json({
            msg: 'error fetching todos',
            error: e.message
        })
    }
})

router.put('/:id', async (req, res) => {
    const todoId = req.params.id
    const {title, description, completed} = req.body

    try {
        await Todo.findById({
            _id: todoId
        })
    } catch (e) {
        return res.status(400).json({
            msg: 'todo not found',
            error: e.message
        })
    }
    try {
        await Todo.updateOne({
            todoId
        }, {
            title: title,
            description: description,
            completed: completed
        })
        return res.status(201).json({
            msg: 'updated the todo successfully',
            todo: await Todo.findOne({_id: todoId})
        })
    } catch (e) {
        return res.status(400).json({
            msg: 'error updating todo',
            error: e.message
        })
    }
})

router.delete('/:id', async (req, res) => {
    const todoId = req.params.id
    try {
        await Todo.findById({
            _id: todoId
        })
    } catch (e) {
        return res.status(400).json({
            msg: 'todo not found',
            error: e.message
        })
    }
    try {
        await Todo.deleteOne({
            _id: todoId
        })
        res.status(201).json({
            msg: 'todo deleted successfully',
        })
    } catch (e) {
        return res.status(400).json({
            msg: 'error deleting todo',
            error: e.message
        })
    }
})

module.exports = router