const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


const mongoose = require("mongoose");
const env = require("dotenv").config();






async function checkConnection() {
    try {
        
        await mongoose.connect(process.env.MONGO_URL);

        console.log("Successfully connected to Mongodb");
        console.log(mongoose.connection.name);

    } catch (err) {
        console.log("MongoDB connection error:", err.message);
    }
}

module.exports = checkConnection;
