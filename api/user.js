module.exports = app => {
    const save = (req, res) => {
        res.send('save user')
    }

    return { save }
}