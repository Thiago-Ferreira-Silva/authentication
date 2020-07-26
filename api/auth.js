const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')

module.exports = app => {
    const signin = async (req, res) => {
        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if(!isMatch) return res.status(401).send()

        const now = Math.floor(Date.now()/1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            iat: now,
            exp: now + (60*60)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    return { signin } 
}