//1

const express = require("express") ; 
const { register, login } = require("../controllers/user");
const { registerValidation, validation, loginValidation } = require("../middleware/validator");
//const isAuth = require ("../middleware/isAuth")
//2 

const router = express.Router()

// 4 (routes)
// register 

router.post("/register" ,registerValidation , validation , register )


// login 

router.post( "/login" , loginValidation , validation , login )

// current user 

// router.get('/current' , isAuth , (req , res) => {
  //  res.send(req.user) 
// })





//3 

module.exports = router 
