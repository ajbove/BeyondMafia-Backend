const express = require('express');
const app = express();
const db = require('./db/db');


const userRouter = require('./routes/users');
var cors = require('cors')

app.use(cors())

app.use(express.json());


app.post('/users/register', (req, res)=>{

    const username = req.body.username;
    const hash = req.body.username;
    const email = req.body.username;
    const ip = req.body.username;

    db.query('insert into usertable (username, hash, email, ip) values (?,?,?,?)',
    [username, hash , email, ip], (err, res) => {
        console.log(err)
    });

})

app.listen(3001, () =>{
    console.log("Server is listening on PORT: 3001")
});

