const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const postRoutes = require("./src/routes/postRoutes.js");

const db = require("./src/db/db.js"); // Import the database connection

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

//API routes
app.use("/api/post", postRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
