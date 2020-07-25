module.exports = app => {
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)
    
    app.route('/users/:id')
        .post(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)
}