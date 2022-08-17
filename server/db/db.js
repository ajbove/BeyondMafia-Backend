const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "",
    password: ""
  });
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");

    var createSql = 'CREATE SCHEMA mafiaData';
    var userTable = 'CREATE TABLE `mafiaData`.`users` (\
        `userid` INT NOT NULL,\
        `email` VARCHAR(45) NOT NULL,\
        `hash` VARCHAR(40) NOT NULL,\
        `ip` INT NULL,\
        PRIMARY KEY (`userid`),\
        UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);';


    var userInfo = 'CREATE TABLE `mafiaData`.`userinfo` (\
        `username` VARCHAR(30) NOT NULL,\
        `userid` INT NOT NULL,\
        `stats` JSON NULL,\
        `friends` JSON NULL,\
        `blocked` JSON NULL,\
        `bio` MEDIUMTEXT,\
        UNIQUE INDEX `userid_UNIQUE` (`userid` ASC) VISIBLE,\
        PRIMARY KEY (`username`),\
        UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);';

    con.query(createSql, function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
    con.query(userTable, function (err, result) {
        if (err) throw err;
        console.log("User Table created");
      });
    con.query(userInfo, function (err, result) {
        if (err) throw err;
        console.log("UserInfo created");
      });
    
});