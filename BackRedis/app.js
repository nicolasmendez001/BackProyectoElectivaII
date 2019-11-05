var express = require("express");
var redis = require('redis');
var client = redis.createClient();
const session = require('express-session');
const redisStore = require('connect-redis')(session);

const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'ThisIsHowYouUseRedisSessionStorage',
    name: '_redisPractice',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 86400 }),
  }));

client.on('connect', function () {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});


/* 

primero escoger la db

client.select(1, function(err,res){
    client.set('key', 'string'); 
  });
*/

app.get('/user', (req, res) => {
    console.log("Entrada de peticion get de /user " + new Date());

    res.send("hello");
});

app.post('/existUser', (req, res) => {
    var email = req.body.email;
    client.select(1, function (err, res) {
        client.exists(email, function (error, result) {
           console.log(result);
           
        });
    });
});

app.post('/saveUser', (req, res) => {
    var email = req.body.email;
    var pass = req.body.password;

    client.select(1, function (err, res) {
        client.set(key, function (error, result) {
           
        });
    });
});

app.listen(3001, () => {
    console.log('Server listening on port: ', 3001)
});