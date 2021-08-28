const express = require('express');
const app = express();
const port = 8000;

app.listen(port, function(err){

    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Serving is running on port number: ${port}`);
});