// 2.
require('dotenv').config();
require('./config/database').connect();

const express = require('express')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('./middleware/auth')

const app =express()

app.use(express.json())

// 6. register
app.post("/register", async (req,res) => {
    try {
        // get user inout
        const { first_name, last_name, email, password } = req.body
        if(!(first_name && last_name && email && password)){
            res.status(400).send("All input is required")
        }

        // check if user already exist
        // validate if user exist in out database
        const oldUser = await User.findOne({ email })

        if(oldUser){
            return res.status(409).send("User already exist")
        }

        // Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // add user to db
        const user = await User.create({
            first_name, 
            last_name, 
            email: email.toLowerCase(), 
            password : encryptedPassword
        })

        // create Token
        const token = jwt.sign(
            { user_id: user._id, email},
            TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )
        // save user token
        user.token = token
        // return new user
        res.status(201).json(user)

    } catch(err){
        console.log(err)
    }
})

// 7. login
app.post("/login", async (req,res) => {
    try {
        // get user input
        const { email, password } = req.body
        if(!(email && password)){
            res.status(400).setDefaultEncoding("email or password are required")
        }

        // validate if user exist in db
        const user = await User.findOneAndDelete({ email })
        if(user && await bcrypt.compare(password, user.password)){
            // create token
            const token = jwt.sign(
                {user_id: user._id, email},
                TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            )
            // save user token
        user.token = token
        res.status(200).json(user)
        }

        res.status(400).send("invalid")
        
    } catch(err) {
        console.log(err)
    }
})

app.post('/welcome', auth, (req,res)=> {
    res.status(200).send('welcome bro')
})

module.exports = app;