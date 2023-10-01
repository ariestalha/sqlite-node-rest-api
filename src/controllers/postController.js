const db = require("../db/db"); // Import the database connection

exports.getPosts = async (req, res) => {
  try {
    const { apartment, resident } = req.query;

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
    let query = `${selectClause}
    ${whereClause}
    ${orderByClause}`;

    db.all(query, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
