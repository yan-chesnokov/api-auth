const express = require('express')
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT || 'mongoose url',{useNewUrlParser:true},() => console.log('connected to DB'))
//MiddLewara
app.use(express.json());
//import router
const autchRoute = require('./router/autch');
app.use('/api/user',autchRoute);
const postsRoute = require('./router/User');
app.use('/api/posts',postsRoute);

app.listen(3000, () => console.log("Server Up and ranning 3000"));
