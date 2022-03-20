const express = require('express');
const User = require('../models/Usermodel');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../keys');
const requirelogin = require('../middlewares/requirelogin');

const userRouter = express.Router();
userRouter.get('/',requirelogin,(req, res) => {
    res.send('Hello from new routes')
})

userRouter.post('/api/users/signup', async function(req, res){
    const {name,email,password,role} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({error: 'All feilds are required'});
    }
    const usrmail = await User.findOne({email});
    if(usrmail){
        return res.status(422).json({error: 'User Email already exists'});
    }
    const user = await User.create({name,email,password,role});
    if(user){
        res.json({message: 'Registration success'});
    }
    else{
        res.status(422).json({error: 'Registration error occured!'});
    }
});


//login module
userRouter.post('/api/users/login',async (req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({error: 'All feilds are required'});
    }
    const user = await User.findOne({email});
    if(user){
        if(await user.isPassword(password)){
            const token = await jwt.sign({_id:user._id,role:user.role}, JWT_SECRET_KEY);
            res.json(token);
        }
        else{
            res.status(422).json({error: 'Please check your email and password'})
        }
    }
    else{
        res.status(404).json({error: 'User Not Found'});
    }
    
   
})

module.exports = userRouter;