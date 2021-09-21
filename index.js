const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
app.use(express.static('./assets'));

app.use(expressLayouts); // telling that all the views that are being renderred belong to a layout
//extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true); // extracts style(css)
app.set('layout extractStcripts', true);// extracts js





//use express router
app.use('/', require('./routes/index')); // 1 -> application calling route's index
app.set('view engine', 'ejs');
app.set('views','./views');


app.listen(port, function(err){

    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Serving is running on port number: ${port}`);
});