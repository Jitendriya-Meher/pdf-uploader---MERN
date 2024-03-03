
const mongoose = require('mongoose');
// import mongoose from 'mongoose';

require('dotenv').config();
// import dotenv from 'dotenv';
// dotenv.config();

const dbConnect = () => {

    try{
        mongoose.connect( process.env.DATABASE_URL);
        console.log("Db connection established");
    }
    catch(err){
        console.log("Db connection error: " , err.message)
    }

};

module.exports = dbConnect;
// export default dbConnect;