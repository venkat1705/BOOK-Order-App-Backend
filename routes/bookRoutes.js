const express = require('express');
const requireadmin = require('../middlewares/requireadmin');
const requirelogin = require('../middlewares/requirelogin');
const Book = require('../models/bookmode');
const bookRouter = express.Router();

//Allbooks module to get all the books in the db;
bookRouter.get('/api/books/allbooks',requirelogin,(req, res) => {
    Book.find().then((result) => {
        res.json({allbooks: result});
    }).catch((err) => {
        console.log(err);
    })
})


bookRouter.post('/api/books/createbook',requirelogin,requireadmin,async function (req, res){
    const {bookname,author,genere} = req.body;
    if(!bookname || !author || !genere){
        return res.status(400).json({error: 'All feilds are required'});
    }
    const availablebook = await Book.findOne({bookname});
    if(availablebook){
        return res.status(422).json({error: 'Book Already Exists'});
    }

    const book = await new Book({bookname,author,genere});
    book.save().then(result => {
        res.json({book:result});
    }).catch(err => {
        return res.status(422).json({error:err})
    })
});

bookRouter.delete('/api/books/delete/:id',requirelogin,requireadmin,async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        res.send(book);
    } catch (error) {
        res.json(error);
    }
});

bookRouter.put('/api/books/update/:id',requirelogin,requireadmin,async (req, res) => {
    const book = await Book.findById(req.params.id);
    if(book){
        const updatebook = await Book.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        res.json(updatebook);
    }
    else{
        res.status(500).json({error:'Updation failed'});
    }
});


module.exports = bookRouter;