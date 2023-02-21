const {PythonShell} = require('python-shell')
let st = false
const port = 5000
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const data = require('./db.json')
const app = express();
require("dotenv").config()

app.use(cors());
app.use(bodyParser.json());

console.log('data: ', data)
app.get("/scrape",async (req, res) => {
    console.log('starting scrape');

    st = true
    st && await PythonShell.run(
        'news-headline.py', null).then(messages=>{
            console.log('finished scrape');
          }); 

    res.sendFile('db.json',{ root: __dirname })
    st = false
});



app.get("/recent",async (req, res) => {
    res.sendFile('db.json',{ root: __dirname })
});

app.listen(port, () => { 
 console.log(`Server is running on http://localhost:${port}`); 
}); 


