const express = require('express');
const app = express();
const port = 8000;

//use express router

app.use('/', require('./routes/index')); // 1 -> application calling route's index

app.listen(port, function(err){

    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Serving is running on port number: ${port}`);
});