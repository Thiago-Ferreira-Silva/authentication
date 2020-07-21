const express = require('express')
const bodyparser = require('body-parser')
const consign = require('consign')
const port = 8081

const app = express()

app.use(bodyparser.urlencoded({ extended: true }))

consign()
        .include()

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})