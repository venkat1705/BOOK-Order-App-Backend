const express = require('express');
const dbConnect = require('./dbconfig');
const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/Userroutes');
const app = express();
dbConnect()
const PORT = 5000;

app.use(express.json())
app.use(userRouter)
app.use(bookRouter)

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})
