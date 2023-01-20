require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const postRouter = require('./controllers/post');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const mongoose = require('mongoose');


mongoose.connect(process.env.mongoDB)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB', err));

app.use(cors());
app.use(express.json());

app.use('/api/posts', postRouter);
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);
module.exports = app
