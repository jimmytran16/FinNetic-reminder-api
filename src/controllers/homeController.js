const homeController = (req, res, next) => {
    return res.json({
        message: 'Welcome to the Reminder API',
    })
}

module.exports = homeController;