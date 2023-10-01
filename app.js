const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const db = require("./db"); // Import the database connection

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define API routes here
// Example: app.get('/api/users', (req, res) => { ... })

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api/resident", (req, res) => {
  db.all("SELECT * FROM resident", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

app.get("/api/apartment", (req, res) => {
  db.all("SELECT * FROM apartment", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

app.get("/api/post", (req, res) => {
  const { apartment, resident } = req.query;
  console.log(apartment, resident);

  let selectClause = `SELECT p.id as post_id, p.title as post_title, p.description as post_description, r.id as resident_id, r.name as resident_name, a.id as apartment_id, a.name as apartment_name
  FROM post p
  INNER JOIN resident r
  ON p.resident_id = r.id
  INNER JOIN apartment a
  ON p.apartment_id = a.id`;

  let whereClause = "";
  if (apartment) {
    whereClause = `WHERE p.apartment_id = ${apartment}`;
  } else if (resident) {
    whereClause = `WHERE p.resident_id = ${resident}`;
  }

  let orderByClause = "ORDER BY p.created_at DESC";

  console.log(whereClause);

  let query = `${selectClause}
  ${whereClause}
  ${orderByClause}`;

  // let query = `SELECT p.*, r.*, a.*
  // FROM post p
  // INNER JOIN resident r
  // ON p.resident_id = r.id
  // INNER JOIN apartment a
  // ON p.apartment_id = a.id`;

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});
