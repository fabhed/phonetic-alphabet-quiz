const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// Create express app
const app = express();

// Set up SQLite database
let db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Use body-parser middleware to handle post requests
app.use(bodyParser.json());

// Define API endpoints
app.get('/api/question/:id', (req, res) => {
  let sql = `SELECT * FROM questions WHERE id = ?`;
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(row);
  });
});

app.post('/api/answer', (req, res) => {
  let sql = `SELECT correct_answer FROM questions WHERE id = ?`;
  db.get(sql, [req.body.questionId], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.json({correct: req.body.answer === row.correct_answer});
  });
});

// Start server
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
