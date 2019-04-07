// Based on https://github.com/ericf/express-handlebars

const port = 3000;
const express = require('express');
const hb  = require('express-handlebars');
const app = express();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  //port     : '3306',
  user     : 'root',
  password : '12345',
  database : 'testdb'
});

 // {{!-- +++++++++++++ ROCK THROWING ++++++++++++ --}}

const query_test_select = 'SELECT SName FROM Test;';
const query_test_insert = 'INSERT INTO Test (EmplId, SName, HireDate) VALUES (?, ?, ?);';

app.engine('handlebars', hb({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.urlencoded());

app.get('/', function (req, res) {
    connection.query(query_test_select, (error, results, fields) => {
        if (error) {
            throw error;
        }
        // {{!-- +++++++++++++ ROCK THROWING ++++++++++++ --}}

        // for(index in moods) {
        //     select.options[select.options.length] = new Option(moods[index], index);
        // }

        res.render('home',
            { 
                results
            });
    });
});

app.post('/api/user/create', (req, res) => {
    const name = req.body.name;
    const emplid = req.body.emplid;
    const hiredate = new Date();
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

