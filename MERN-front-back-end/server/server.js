const express = require('express');
const app = express();
const ConnectDB = require('./config/db');

//Routes destination path
const registerRoute = require('./routes/register');
const gestsRoute = require('./routes/guests');
const authRoute = require('./routes/auth');

//connect DataBase
ConnectDB();

app.use(express.json());

//Define Routes
app.use('/register', registerRoute);
app.use('/login', authRoute);
app.use('/guests', gestsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started at port ${PORT}`));