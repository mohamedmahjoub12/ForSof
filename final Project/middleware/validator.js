const { check , validationResult } = require("express-validator")


exports.registerValidation = () => [
   check ("name" , "Name is required !! ").not().isEmpty(),
   check ("email" , "enter valid email").isEmail(),
   check ("password" , "enter a valid password").isLength({min : 6})
]

exports.loginValidation = () => [
    check ("email" , "enter valid email").isEmail(),
    check ("password" , "enter a valid password").isLength({min : 6})
]

exports.validation = (req , res , next ) => {
    const errors = validationResult(req) ; 
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array() })
    }
    next()
} 
