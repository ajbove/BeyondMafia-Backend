const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "anthony",
    password: "Sababa2094!"
  });
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");

    var createSql = 'CREATE SCHEMA mafiaData';
    var userTable = 'CREATE TABLE `mafiaData`.`userTable` (\
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


    con.query(createSql, function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
    
    con.query(userTable, function (err, result) {
        if (err) throw err;
        console.log("User Table created");
      });
    
    
})

module.exports = con;