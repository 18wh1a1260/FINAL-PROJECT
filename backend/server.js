const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

dotenv.config();

const app = express();

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_ROOT,
  password: process.env.MYSQL_PASSWORD,
  database: 's13energysector',
});

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  db.connect();
  const { userName, password } = req.body;
  const query = 'SELECT * FROM users WHERE user_name = ?';
  db.query(query, [userName], (err, results) => {
    db.end();
    if (err) return res.status(500).send('Database error');
    if (results.length === 0) {
      return res.status(400).send('Invalid email or password');
    }
    const user = results[0];
    if(password!==user.password) {
      return res.status(400).send('Invalid email or password');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret-token', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token, user: {
      _id: user._id,
      email: user.email
    }});
  });
});

app.get('/api/summary-chart', (req, res) => {
  db.connect();
  const query = `SELECT label, data FROM visualization_data WHERE type = 'summary'`;
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    const response = results.map(row => ({
      label: row.label,
      data: JSON.parse(row.data),
    }));
    res.json(response);
  });
});

app.get('/api/report-chart', (req, res) => {
  db.connect();
  const query = `SELECT label, data FROM visualization_data WHERE type = 'report'`;
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    const response = results.map(row => ({
      label: row.label,
      data: JSON.parse(row.data),
    }));
    res.json(response);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
});