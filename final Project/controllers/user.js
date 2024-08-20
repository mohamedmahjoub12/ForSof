const User = require("../models/User")
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken') 

exports.register = async (req , res) => {
    try {
        const { name , email , password , phone } = req.body 
        const foundUser = await User.findOne ({email})
        if (foundUser) {
            return res.status(400).send({errors : [{msg : "try again" }]})
        }
        const saltRounds = 10 
        const hashedPassword = await bcrypt.hash(password , saltRounds)
        // const new user 
        const newUser = new User({...req.body})
        newUser.password = hashedPassword
        await newUser.save()
        // creation token 
        const token = jwt.sign({
             id : newUser._id
        } ,
      process.env.SECKEY, 
      {expiresIn : "1h"}
    )

        res.status(200).send({msg : "register successfully" , user : newUser , token })
    } catch (error) {
        res.status(400).send({ errors : [{msg : "cannot register" }]})
    }
}

exports.login = async (req , res) => {
  try {
    const { email , password } = req.body 
    const findUser = await User.findOne ({email})
        if (!findUser) { return res.status(400).send({errors : [{msg : "Bad credentials" }]})}
      const checkPassword = await bcrypt.compare(password , findUser.password)

      if (!checkPassword) {return res.status(400).send({errors : [{msg : "Bad credentials" }]})}
        // creation token 
        const token = jwt.sign({
            id : findUser._id
       } ,
     process.env.SECKEY, 
     {expiresIn : "1h"}
   )

      res.status(200).send({msg : "login successfully" , user : findUser , token })
  }
        catch (error) {
            res.status(400).send({ errors : [{msg : "cannot login" }]})
  }
}