//1

const express = require ("express") ; 

//2

const app = express() ; 

// 5    
require("dotenv").config() ; 

//6
const connectDB = require("./config/connectDB")
connectDB() 

// 7 (routing)

// middleware
app.use(express.json())

// route 
app.use("/api/user" , require ("./routes/user"))

//3

const PORT = process.env.PORT

// 4
app.listen(PORT , (err) => err? console.error(err) : console.log(`Server is running on port ${PORT}`))
