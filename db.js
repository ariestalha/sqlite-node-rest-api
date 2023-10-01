//const sqlite3 = require("sqlite3").verbose();

// Connect to the SQLite database
// const db = new sqlite3.Database("./data.db", (err) => {
//   if (err) {
//     console.error("Error opening database:", err);
//   } else {
//     console.log("Connected to the database");
//   }
// });

// module.exports = db;

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("mydb.db");

// Create a "users" table
db.serialize(() => {
  //db.run("CREATE TABLE IF NOT EXISTS users (id INT, name TEXT)");

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
  //   db.run(`CREATE TABLE IF NOT EXISTS suppliers (
  //       supplier_id   INTEGER PRIMARY KEY,
  //       supplier_name TEXT    NOT NULL,
  //       group_id      INTEGER NOT NULL
  //   )`);
  // Insert sample data
  //   const stmt = db.prepare("INSERT INTO users VALUES (?, ?)");
  //   stmt.run(1, "John Doe");
  //   stmt.run(2, "Jane Smith");
  //   stmt.finalize();
  //   // Retrieve data
  //   db.each("SELECT id, name FROM users", (err, row) => {
  //     if (err) {
  //       console.error(err.message);
  //     }
  //     console.log(row.id, row.name);
  //   });
});

// Close the database connection
//db.close();

module.exports = db;
