const express = require('express');
require('dotenv').config();
const { mongoose } = require('mongoose');

mongoose.connect(process.env.MONGODB);
const app = express();
const authRoutes = require('./routes/authRoutes');
app.use(express.json());

app.use('/user', authRoutes);
app.listen(3000);