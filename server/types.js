const z = require('zod')

/*
    for create todo
    title: string,
    description: string
*/

/*
    for update todo
    id: string
    title: string
    description: string
    completed: boolean
*/

const createTodo = z.object({
    title: z.string(),
    description: z.string(),
})

const updateTodo = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    completed: z.boolean()
})

module.exports = {
    createTodo: createTodo,
    updateTodo: updateTodo
}