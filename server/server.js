require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.port

app.use(express.json())

app.listen(port, () => {
    console.log(`app is listening to port ${port}`)
})