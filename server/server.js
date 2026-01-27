require('dotenv').config()
const express = require('express')
const todoRoutes = require('./routes/todoRoutes')

const app = express()

const port = process.env.port

app.use(express.json())
app.use('/todos', todoRoutes)

app.listen(port, () => {
    console.log(`app is listening to port ${port}`)
})