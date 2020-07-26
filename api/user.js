const bcrypt = require('bcrypt')
const passport = require('passport')

module.exports = app => {
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = (req, res) => {
        const user = { ...req.body }
        user.id = req.params.id
        user.password = encryptPassword(req.body.password)

        if(!user.id) {
            app.db('users')
                    .insert(user)
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                    .update(user)
                    .where({ id: user.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('users')
                .select('id', 'name', 'email')
                .then(users => res.json(users))
                .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
                .select('id', 'name', 'email')
                .where({ id: req.params.id })
                .then(user => res.json(user))
                .catch(err => res.status(500).send(err))
    }

    const remove = (req, res) => {
        app.db('users')
                .where({ id: req.params.id})
                .del()
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
    }

    return { save, get, getById, remove }
}