const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const router = require('./src/routes/web');

const app = express();

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

Sentry.init({
    dsn: "https://c464a3968c5d4de6bfbbbe80f4d8a7c5@o4504336658726912.ingest.sentry.io/4504336660234241",
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use('/', router);
app.use(Sentry.Handlers.errorHandler());

app.use((err, req, res, next) => {
    console.log(err.message)
    res.status(500).render('admin/errors/500')
})

app.listen(3000, 'localhost', () => {
    console.log('server listening on port 3000')
})
