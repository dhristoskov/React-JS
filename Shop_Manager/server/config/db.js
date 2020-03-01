const mongoose = require('mongoose');
require('dotenv').config();

const db = process.env.MONGO_ATLAS;

//Connetc to MongoDB.Atlas 
const ConnectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('Connected to MongoDB successfuly...')
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = ConnectDB;