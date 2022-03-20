const mongoose = require('mongoose');
const { MONGO_URI } = require('./keys');

const dbConnect = ()=>{
    mongoose.connect(MONGO_URI).then(()=>{
        console.log('Connected');
    }).catch(err=>{
        console.log(err);
    })
}

module.exports = dbConnect;