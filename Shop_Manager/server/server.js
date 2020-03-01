const express = require('express');
const ConnectDB = require('./config/db');
const app = express();

//Connect to db(MongoDB.Atlas)
ConnectDB();
app.use(express.json());

//Routes destination path
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const requestRoute = require('./routes/requests');
const shopsRouter = require('./routes/shops');

//Define Routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/requests', requestRoute);
app.use('/shops', shopsRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listen at port ${PORT}`));
