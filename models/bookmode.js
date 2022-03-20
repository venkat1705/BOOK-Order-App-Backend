const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookname: {
        type:String,
        required: true
    },
    author: {
        type:String,
        required: true
    },
    genere:{
        type:String,
        required: true
    }

});

const Book = mongoose.model('Book',bookSchema);
module.exports = Book;