exports.userSingupValidator = (req, res, next) => {
    req.check("name", "Name is required").notEmpty();

    req.check("email", "Email is required").notEmpty()
    .matches(/.+\@.+\..+/).withMessage('Email must contain @')
    .isLength({
        min: 3,
        max: 32
    }).withMessage("Email must be between 3 and 32 characters");

    req.check("hashed_password", "Password is required").isLength({
        min: 6
    }).withMessage("Password must be at least 6 characters.");
    const errors = req.validationErrors();
    if(errors) {
        const firstError = errors.map(error => error.msg);
        return res.status(400).json({
            error: firstError[0]
        });
    }
    next();
}