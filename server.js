const express = require('express')
const port = process.env.PORT || 8080
const app = express()

app.use(express.static(__dirname + "/dist/"))

app.use(({ url }, res, next) => url.match(/firebase-messaging-sw.js/) && process.env.NODE_ENV !== 'production' ? res.status(200) : next())

app.get(/.*/, function (request, response) {
    response.sendFile(__dirname + "/dist/index.html")
})

app.listen(port)

console.log(`Server started... on ${port}`)