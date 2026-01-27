const mongoose = require('mongoose')

mongoose
    .connect(process.env.mongodbURI)
    .then(() => console.log('mongodb connected'))
    .catch((e) => console.error(`error connecting mongodb ${e.message}`))
