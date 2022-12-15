const express = require('express');
const path = require("path");
const passport = require('passport');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser')
var flash = require('connect-flash');

const router = require('./src/routes/web')

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static( 'public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,

}));
app.use(flash());
app.use(passport.authenticate('session'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})
app.use('/', router);

app.listen(3000, 'localhost', () => {
    console.log('server listening on port 3000')
})
