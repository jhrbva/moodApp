// Based on https://github.com/ericf/express-handlebars

const port = 3000;
const express = require('express');
const hb  = require('express-handlebars');
const app = express();
var path = require('path');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'MoodApp'
});

const query_get_mood_colors = 'SELECT * FROM moodcolor;';
const query_moods_user = 'SELECT COUNT(*) As count, color FROM UserMoodsByTime natural join MoodColor WHERE username="test" GROUP BY color;'; 
const query_insert_user_mood = 'INSERT INTO UserMoodsByTime (username, entryTime, moodID, durationInHours) VALUES (?, ?, ?, ?);';
const query_getUserInfo = 'SELECT * FROM Users WHERE username="test";';
const query_calendarInfo = 'SELECT * FROM UserMoodsByTime Natural JOIN MoodColor WHERE username="test" AND entryTime BETWEEN date_sub(now(),INTERVAL 1 WEEK) and now();';

app.engine('handlebars', hb({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.urlencoded());


app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
    connection.query(query_get_mood_colors, (error, results, fields) => {
        if (error) {
            throw error;
        }
		connection.query(query_moods_user, (error2, colorInfo, fields2) => {
			if (error2) {
				throw error2;
			}
			res.render('home', { results, colorInfo });
		});    
    });
});

app.get('/api/user/profile', function (req, res) {
	 connection.query(query_getUserInfo, (error, profInfo, fields) => {
        if (error) {
            throw error;
        }
	res.render('profile', {profInfo});
	});
});

app.get('/api/user/calendar', function (req, res) {
	connection.query(query_calendarInfo, (error, calInfo, fields) => {
        if (error) {
            throw error;
        }
	res.render('calendar', { calInfo });
	});
});

app.post('/api/user/create', (req, res) => {
    const user = "test";
	const date = req.body.startTime;
	const moodID = req.body.moodSelect.split(':')[0];
    const duration = req.body.duration;
	//const emplid = req.body.userID;
    connection.query(query_insert_user_mood, [user, date, moodID, duration], (error, results, fields) => {
        if (error) {
            throw error;
        }
        res.redirect('/')
    });
});


app.listen(3000);

