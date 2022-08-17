const express = require('express');
const app = express();

const userRouter = require('./routes/users');

app.use('/users', userRouter)

app.listen(3001, () =>{
    console.log("Server is listening on PORT: 3001")
});

