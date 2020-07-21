const express = require('express')
const bodyparser = require('body-parser')
const port = 8081

const app = express()

app.use(bodyparser.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})