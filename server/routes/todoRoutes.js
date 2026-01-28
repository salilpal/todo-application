const router = require('express').Router()
const z = require('zod')
const { Todo } = require('../config/db')
const { createTodo, updateTodo } = require('../types')

// route to add a todo
router.post('/todo', async (req, res) => {
    const {title, description} = req.body
    const validation = createTodo.safeParse({title, description})
    if(!validation.success) {
        return res.status(411).json({
            msg: 'you sent the wrong inputs'
        })
    }
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

// route to fetch all todos
router.get('/todos', async (req, res) => {
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

// route to mark a specific todo as completed
router.put('/completed/:id', async (req, res) => {
    const todoId = req.params.id
    const {title, description, completed} = req.body
    const validation = updateTodo.safeParse({
        todoId,
        title,
        description,
        completed
    })
    if (!validation.success) {
        return res.status(411).json({
            msg: 'you sent the wrong inputs.'
        })
    }
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
            _id: todoId
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

// a route to mark all todos as completed
router.put('/completed', async (req, res) => {
    try {
        await Todo.updateMany({}, {
            completed: true
        })
        return res.status(201).json({
            msg: 'marked all todos completed',
            todos: await Todo.find({})
        })
    } catch (e) {
        return res.status(401).json({
            msg: 'marking all todos complete failed',
            error: e.message
        })
    }
})

// a route to delete a specific todo
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

// a route to delete all todos
router.delete('/deleteall', async (req, res) => {
    try {
        await Todo.deleteMany({})
        return res.status(201).json({
            msg: 'all todos deleted successfully'
        })
    } catch (e) {
        return res.status(401).json({
            msg: 'error deleting all todos',
            error: e.message
        })
    }
})

module.exports = router