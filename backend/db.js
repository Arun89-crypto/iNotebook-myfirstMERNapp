//this is a database file to connect to the database
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"; //mongodb url

const Connect_to_mongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to mongo successfully ....");
    })
}

module.exports = Connect_to_mongo;