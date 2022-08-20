const mysql = require('mysql2/promise');


async function initalizationQuery(con){
var createSchema = `CREATE SCHEMA IF NOT EXISTS mafiaData`
await con.execute(createSchema)
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
con.execute(createUserTable);
var createGamesTable =  `CREATE TABLE IF NOT EXISTS mafiaData.Games
(gameId int AUTO_INCREMENT PRIMARY KEY,
port int,
maxPlayers int,
rankedGame bool,
lockedGame bool,
startedGame bool,
gameEnded bool
)`
con.execute(createGamesTable)
var createGamePlayersTable =  `CREATE TABLE IF NOT EXISTS mafiaData.gamePlayers
(gameId int unsigned,
uuid int
)`
con.execute(createGamePlayersTable)
var createGameRolesTable = `
CREATE TABLE IF NOT EXISTS mafiaData.gameRoles
(gameId int,
roleConfig  int unsigned
)`
con.execute(createGameRolesTable)
var createGameQueue = `
CREATE TABLE IF NOT EXISTS mafiaData.gameTableQueue  (port INT)`
con.execute(createGameQueue)
var playerSocket = `CREATE TABLE IF NOT EXISTS mafiadata.playersocket
(gameId int,
websocketport int,
uuid int unsigned,
UNIQUE(uuid)
)`
con.execute(playerSocket)
}

async function getDatabase(){
var con = await mysql.createConnection({
    host: "127.0.0.1",
	port: "3306",
    user: "anthony",
    password: "Sababa2094!"
  });
  await initalizationQuery(con);
  return con;
}

exports.getDatabase = getDatabase;
