const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("feedDB.db");

// Create Tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS apartment (
    	id	INTEGER PRIMARY KEY,
    	name TEXT NOT NULL
        )`);
  db.run(`CREATE TABLE IF NOT EXISTS resident (
          id   INTEGER PRIMARY KEY,
          name TEXT    NOT NULL,
          apartment_id      INTEGER NOT NULL,
          FOREIGN KEY (apartment_id)
             REFERENCES apartment (id)
      )`);
  db.run(`CREATE TABLE IF NOT EXISTS post (
        id   INTEGER PRIMARY KEY,
        title TEXT    NOT NULL,
        description    TEXT,
        apartment_id      INTEGER NOT NULL,
        resident_id      INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (apartment_id)
           REFERENCES apartment (id) ,
        FOREIGN KEY (resident_id)
           REFERENCES resident (id) 
    )`);
});

// Close the database connection
//db.close();

module.exports = db;
