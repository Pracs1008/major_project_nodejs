const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');


app.use(sassMiddleware({
    src: './assets/scss', // source from where i will get my scss file
    dest: './assets/css', // place where i will keep my css files
    debug: true, // info that we see in the terminal if the file cannot be converted
    outputStyle: 'extended', // in an elaborate way
    prefix: '/css' // where in assets folder should the server look for the css files

}));

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static('./assets'));

app.use(expressLayouts); // telling that all the views that are being renderred belong to a layout
//extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true); // extracts style(css)
// app.set('layout extractStcripts', true);// extracts js






app.set('view engine', 'ejs');
app.set('views','./views');


app.use(session({
    name: 'codeial', // name of cookie
    //TODO - Change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false, // cookie if the user has not logged in 
    resave: false, // after each request resave the cookies
    cookie: {
        maxAge: (1000 * 60 * 100) // number of minutes  
    },
    //mongo store is used to store the session cookie in the db
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_development',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect mongo setup ok');
        }
    )
    
}));


app.use(passport.initialize());// tell the app to use passport
app.use(passport.session()); // maintain session using passport
app.use(passport.setAuthenticatedUser);// current user usage
//use express router
app.use('/', require('./routes/index')); // 1 -> application calling route's index

app.listen(port, function(err){

    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Serving is running on port number: ${port}`);
});