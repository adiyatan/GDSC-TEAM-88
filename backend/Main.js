const express = require('express');
const app   = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router = require('./Router');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

//Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myapp'
});

// db.connect(function(err){
//     if (err) {
//         console.log('DB error');
//         throw err;
//         return false;
//     }
// })

//Express session
const sessionStore = new MySQLStore ({
    expiration: (1825 * 86400 * 1000),
    endConnectionOnClose: false
}, db);

//Secret key
app.use(session ({
    key: '25252i52i2i925sdasdsds',
    secret: 'msmadmakmk2km2mkmk424',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 86400 * 1000),
        httpOnly: false
    }
}));

new Router(app, db);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000);
