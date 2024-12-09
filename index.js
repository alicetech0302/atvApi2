require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3369;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'breno',
  database: 'produtos_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
});

app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.get('/produtos', (req, res) => {
  const sql = 'SELECT * FROM produtos';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM produtos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/produtos', (req, res) => {
  const { nome, quantidade, preco } = req.body;
  const sql = 'INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)';
  db.query(sql, [nome, quantidade, preco], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, nome, quantidade, preco });
  });
});

app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, quantidade, preco } = req.body;
  const sql = 'UPDATE produtos SET nome = ?, quantidade = ?, preco = ? WHERE id = ?';
  db.query(sql, [nome, quantidade, preco, id], (err, result) => {
    if (err) throw err;
    res.json({ id, nome, quantidade, preco });
  });
});

app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM produtos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Produto deletado com sucesso' });
  });
});
