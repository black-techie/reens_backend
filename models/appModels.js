const sqlite = require("sqlite3").verbose();
var md5 = require("md5");
var ReverseMd5 = require('reverse-md5')


const getAll = () => {
  let db = new sqlite.Database("././database/database.db");
  db.serialize(() => {
    db.each(`SELECT * FROM admin`, (err, row) => {
      if (err) {
        console.log("n data");
        console.error(err.message);
      }
      console.log("n data");
      console.log(row);
    });
  });
  db.close();
};


const insert = ({ name, email, phone, pass, location }) => {
  let db = new sqlite.Database("././database/database.db");
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.Ope
      db.run(
        "INSERT INTO admin(fullName,email,phone,location,password) VALUES(?,?,?,?,?)",
        [name, email, phone, location, md5(pass)],
        (err, row) => {
          if (err) reject(err);
          resolve(true);
        }
      );  
    });
    db.close();
  });
};


const login = ({ login, pass, type }) => {
  let db = new sqlite.Database("././database/database.db");
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      var command = "SELECT * FROM admin WHERE phone =? AND password = ?";
      if (type === "email") {
        command = "SELECT * FROM admin WHERE email = ? AND password = ?";
      }
      db.get(command, [login, md5(pass)], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
    db.close();
  });
};


module.exports = {
  insert,
  getAll,
  login
};
