const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./model/userModel');

const jobs = require('./model/jobModel');
const role = require('./enum/role')
const apply_enum = require('./enum/apply')
const apply = require('./model/applyModel');

const port = process.env.DEV1 || 5001;
const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
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

require()

app.listen(port, () => {
    console.log("server listening on port " + port);
})