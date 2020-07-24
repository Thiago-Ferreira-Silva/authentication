module.exports = app => {
    const save = (req, res) => {
        const user = { ...req.body }

        app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
    }

    const get = (req, res) => {
        app.db('users')
                .select('id', 'name', 'email')
                .then(users => res.json(users))
                .catch(err => res.status(500).send(err))
    }

    // faça a autenticação

    return { save, get }
}