import express from "express";

const app = express();

app.use(express.json());

/* app.get("/", (req, res) => {
  res.json({ message: "Thoda Ruko API is running" });
}); */

app.post("/api/users", (req, res) => {
  const { name, industry, age, salary } = req.body;

  res.json({
    message: "Data received",
    user: {
      name,
      industry,
      age,
      salary,
    },
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
