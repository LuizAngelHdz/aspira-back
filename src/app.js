const express = require('express');
const mysql = require('mysql');
var cors = require('cors')

const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());
app.use(cors())

const connection = mysql.createConnection(
  { host: '127.0.0.1', user: 'root', password: '', port: '3306', database: 'toys' }
);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});


app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json({ code: 200, payload: results, message: 'Jugetes obtenidos' })
    } else {
      res.send({ code: 200, payload: [], message: 'Jugetes obtenidos' });
    }
  });
});


app.post('/products/add', (req, res) => {
  const sql = 'INSERT INTO products SET ?';

  const customerObj = {
    name: req.body.name,
    description: req.body.description,
    minAge: req.body.minAge,
    enterprise: req.body.enterprise,
    price: req.body.enterprise,
  };

  connection.query(sql, customerObj, error => {
    if (error) throw error;
    res.json({ code: 200, message: 'Jugete creado', payload: { data: customerObj } })
  });
});

app.put('/products/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, minAge, enterprise, price } = req.body;
  const sql = `UPDATE products SET name = '${name}', description='${description}', minAge='${minAge}', enterprise='${enterprise}', price='${price}' WHERE id=${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.json({ code: 200, message: 'Jugete actualizado', payload: { data: { name, description, minAge, enterprise, price } } })
  });
});

app.delete('/products/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM products WHERE id= ${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.json({ code: 200, message: 'Jugete eliminado', payload: { data: {} } })
  });
});

connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));