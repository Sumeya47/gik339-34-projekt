const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const { error } = require("node:console");


const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db");

db.run(`
    CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    year INTEGER,
    rating INTEGER
    )
`);

app.get("/movies", (req, res) => {
    db.all("SELECT * FROM movies", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});


app.post("/movies", (req, res) => {
    const { title, year, rating } = req.body;

    db.run(
        "INSERT INTO movies (title, year, rating) VALUES (?, ?, ?)",
        [title, year, rating],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });

            }
            res.json({ message: "Film skapad" });
        }
    );
});


app.put("/movies", (req, res) => {
    const { id, title, year, rating } = req.body;


    db.run(
        "UPDATE movies SET title=?, year=?, rating=? WHERE id=?",
        [title, year, rating, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Film uppdaterad" });
        }
    );
});


app.delete("/movies/:id", (req, res) => {
    db.run(
        "DELETE FROM movies WHERE id=?" ,
        [req.params.id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Film borttagen" });
        }
    );
});

app.listen(3000, () => {
    console.log("Server körs på http://localhost:3000");
});