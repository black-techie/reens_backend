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


const insertAdmin = ({ name, email, phone, pass, location }) => {
  let db = new sqlite.Database("././database/database.db");
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        "INSERT INTO admin(fullName,email,phone,location,password) VALUES(?,?,?,?,?)",
        [name, email, phone, location, md5(pass)],
        (err, row) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
    db.close();
  });
};
const insertUser = ({ name, cardid, phone, location }) => {
  let db = new sqlite.Database("././database/database.db");
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        "INSERT INTO users(fullName,cardId ,phone,location) VALUES(?,?,?,?,?)",
        [name, cardid, phone, location],
        (err, row) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
    db.close();
  });
};

const insertMeter= ({ location, dimension, meterId, price }) => {
  let db = new sqlite.Database("././database/database.db");
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        "INSERT INTO meter(meterId,dimension ,pricePerVolume,location) VALUES(?,?,?,?,?)",
        [meterId, dimension, price, location],
        (err, row) => {
          if (err) reject(err);
          resolve();
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

const validate_email = ({ email }) => {
  let db = new sqlite.Database("././database/database.db");
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      command = "SELECT id FROM admin WHERE email = ?";
      db.get(command, email, (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
    db.close();
  });
};

const validate_phone = ({ phone }) => {
  let db = new sqlite.Database("././database/database.db");
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      command = "SELECT id FROM admin WHERE phone = ?";
      db.get(command, phone, (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
    db.close();
  });
};




module.exports = {
  insertAdmin,
  getAll,
  login,
  validate_email,
  validate_phone,
  insertUser,
  insertMeter
};
