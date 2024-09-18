const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./config/db'); 

const app = express();
app.use(bodyParser.json()); 


app.get('/', (req, res) => {
  res.send('Welcome to the Task Management App');
});


app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

  connection.query(sql, [name, email, password], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error registering user', error: err });
      return;
    }
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
