const express = require('express');
const {JWT_SECRET_KEY} = require('../keys');
const User = require('../models/Usermodel');
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(422).json({error: 'You must be logged in'});
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET_KEY,(err,payload) => {
        if(err){
            return res.status(500).json({error:'You Must be logged in'})
        }

        const {_id} = payload;
        User.findById(_id).then(data => {
            req.user = data;
            next();
        })
    })

}