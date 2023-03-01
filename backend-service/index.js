const express = require('express');
const app = express();
const cors= require('cors');
const connection = require('./models/dbConnect')
const bodyparser = require('body-parser');
const user = require('./routers/user.route');
require('colors')
require('dotenv').config()
connection();
app.use(cors());
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}));

app.use('/api/v1/user', user)
const PORT = process.env.PORT
app.listen(PORT || 8000,()=>{console.log(`Port Running Successfuly on Port ${PORT}`.cyan.bold)})    