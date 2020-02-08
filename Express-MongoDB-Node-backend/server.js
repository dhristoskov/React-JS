const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoute = require('./server/routes/Auth');
const recipeRoute = require('./server/routes/Recipes');
require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }, 
    () => console.log('MongoDB conected!'));

const app = express();
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/recipes', recipeRoute);
app.use(cors());

const port = process.env.PORT || 3000;


app.listen(port, () => console.log(`Server is up and ready runing on port ${port}`));