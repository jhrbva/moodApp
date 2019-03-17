// Based on https://github.com/ericf/express-handlebars

const port = 3000;
const express = require('express');
const hb  = require('express-handlebars');
const app = express();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'hello',
  database : 'FakeStudent'
});

const query_test_select = 'SELECT * FROM Test ORDER BY EmplId;';
const query_test_insert = 'INSERT INTO Test (EmplId, Name, HireDate) VALUES (?, ?, ?);';

app.engine('handlebars', hb({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.urlencoded());

app.get('/', function (req, res) {
    connection.query(query_test_select, (error, results, fields) => {
        if (error) {
            throw error;
        }
        res.render('home', { results });
    });
});

app.post('/api/user/create', (req, res) => {
    const name = req.body.name;
    const emplid = req.body.emplid;
    const hiredate = new Date().toISOString();
    connection.query(query_test_insert, [emplid, name, hiredate], (error, results, fields) => {
        if (error) {
            throw error;
        }
        res.redirect('/')
    });
});

app.post('/api/user/delete/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM Test WHERE emplid = ?;', [id], (error, results, fields) => {
        if (error) {
            throw error;
        }
        res.redirect('/')
    });
});

app.post('/api/user/delete', (req, res) => {
    const start = req.body.start;
    const finish = req.body.finish;
    connection.query('DELETE FROM Test WHERE ? < emplid AND emplid < ?;', [start, finish], (error, results, fields) => {
        if (error) {
            throw error;
        }
        res.redirect('/')
    });
});

app.listen(3000);

