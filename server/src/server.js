import express from "express";
import { query } from "./db.js";

const app = express();

app.use(express.json());

/* app.get("/", (req, res) => {
  res.json({ message: "Thoda Ruko API is running" });
}); */

app.post("/api/users", async (req, res) => {
  const { name, industry, age, salary } = req.body;

  const sqlQuery = `INSERT INTO users (name, industry, age, salary)
  VALUES ($1, $2,$3, $4)
  RETURNING *;`;

  const values = [name, industry, age, salary];

  try {
    const result = await query(sqlQuery, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database insertion failed" });
  }
});

app.get("/api/users/:id", async (req, res) => {
  const userId = Number(req.params.id);

  const sqlQuery = `SELECT * FROM users WHERE id = $1`;

  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const result = await query(sqlQuery, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
