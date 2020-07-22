const bodyparser = require('body-parser')
const cors = require('cors')

module.exports = app => {
    app.use(bodyparser.urlencoded({ extended: true }))
    app.use(cors)
}