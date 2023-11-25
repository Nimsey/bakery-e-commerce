app.use((req, res, next) => {
    if (req.user) {
        res.locals.user = req.user; // Make user object available in all templates
    }
    next();
});