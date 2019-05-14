const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.DEV1 || 5001;
const app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
const db = 'mongodb://127.0.0.1:27017/naukri'
mongoose.connect(db, (err) => {

    if (err) throw err;

    console.log('Successfully connected to db');

});
require('./route/route')(app)

app.listen(port, () => {
    console.log("server listening on port " + port);
})