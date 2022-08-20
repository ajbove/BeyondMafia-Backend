const express = require('express');
const cors = require('cors')
const app = express();
const database = require('./db/db');
const userRouter = require('./routes/users');
const s = require('net').Socket();

(async function(){
app.use(cors())

app.use(express.json());
var db = await database.getDatabase();
app.post('/users/register', (req, res)=>{


    const username = req.body.username;
    const hash = req.body.username;
    const email = req.body.username;
    const ip = req.body.username;

    db.execute('insert into usertable (username, hash, email, ip) values (?,?,?,?)',
    [username, hash , email, ip], (err, res) => {
        console.log(err)
    });

})

app.get('/joinGame', async (req,res)=>{
  await db.query("LOCK TABLE mafiadata.gametablequeue WRITE");
  var res = await db.query("SELECT PORT FROM mafiadata.gametablequeue LIMIT 1");
  var port = res[0][0].PORT
  s.connect(port, "127.0.0.1");
  s.on('connect', ()=>{
    var buffer = Buffer.alloc(256).fill('\0');
    var game = {
      cmd: 0,
      roles:[0,1,0,0],
      settings:0
    }
    buffer.write(JSON.stringify(game));
    s.write(buffer, ()=>{
      buffer = Buffer.alloc(256).fill('\0');
      var cmd = {
        cmd: 1,
        playerid: 1
      }
      buffer.write(JSON.stringify(cmd));
      s.write(buffer);
    });
});
  await db.query("DELETE FROM mafiadata.gametablequeue WHERE port = ?",[port]);
  await db.query("UNLOCK TABLES");
})

app.listen(3001, () =>{
    console.log("Server is listening on PORT: 3001")
});
})();
