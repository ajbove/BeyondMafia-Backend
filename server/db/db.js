const mysql = require('mysql2');


async function initalizationQuery(con){
var createSchema = `CREATE SCHEMA IF NOT EXISTS mafiaData`
con.query(createSchema, (err, result) =>{
  if (err)
  { throw err;
  }
  console.log("Schema Created");
  var createUserTable = 'CREATE TABLE IF NOT EXISTS `mafiaData`.`userTable` (\
    `playerid` INT NOT NULL AUTO_INCREMENT,\
    `username` VARCHAR(45) NOT NULL,\
    `hash` VARCHAR(45) NOT NULL,\
    `email` VARCHAR(45) NOT NULL,\
    `stats` JSON NULL,\
    `friends` JSON NULL,\
    `blocked` JSON NULL,\
    `bio` MEDIUMTEXT,\
    `salt` BINARY(64) NOT NULL,\
    PRIMARY KEY (`playerid`),\
    UNIQUE INDEX `playerid_UNIQUE` (`playerid` ASC) VISIBLE,\
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,\
    UNIQUE INDEX `hash_UNIQUE` (`hash` ASC) VISIBLE,\
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,\
    UNIQUE INDEX `salt_UNIQUE` (`salt` ASC) VISIBLE);';
    con.query(createUserTable, (err, result)=> {
      if (err) throw err;
    })
    var createGamesTable =  `CREATE TABLE IF NOT EXISTS mafiaData.Games
(gameId int AUTO_INCREMENT PRIMARY KEY,
port int,
maxPlayers int,
rankedGame bool,
lockedGame bool,
startedGame bool,
gameEnded bool
)`
con.query(createGamesTable, (err, result)=> {
  if (err) throw err;
  var createGamePlayersTable =  `CREATE TABLE IF NOT EXISTS mafiaData.gamePlayers
(gameId int,
uuid int,
FOREIGN KEY (gameId) REFERENCES Games(gameId)
)`
con.query(createGamePlayersTable, (err, result)=> {
if (err) throw err;
})

var createGameRolesTable = `
CREATE TABLE IF NOT EXISTS mafiaData.gameRoles
(gameId int,
uuid  int unsigned,
FOREIGN KEY (gameId) REFERENCES Games(gameId)
)`
con.query(createGameRolesTable, (err, result)=> {
if (err) throw err;
})
});
})
}
async function getDatabase(){
var con = mysql.createConnection({
    host: "127.0.0.1",
	port: "3306",
    user: "anthony",
    password: "Sababa2094!"
  });
  await initalizationQuery(con);
  return con;
}

exports.getDatabase = getDatabase;
