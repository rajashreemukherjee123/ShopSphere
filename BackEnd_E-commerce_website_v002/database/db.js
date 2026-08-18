const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


const mongoose = require("mongoose");
const env = require("dotenv").config();



// async function checkConnection(userName,password){
    
// // const dbUrl = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-mtxrj3z-shard-00-00.edxjkhe.mongodb.net:27017,ac-mtxrj3z-shard-00-01.edxjkhe.mongodb.net:27017,ac-mtxrj3z-shard-00-02.edxjkhe.mongodb.net:27017/ecommerce_v2?ssl=true&replicaSet=atlas-lh6g07-shard-0&authSource=admin&appName=ecommerce_v2`;
//     try{
//         await mongoose.connect(dbUrl);
//         console.log("Successfully connected to Mongodb");
//         console.log(mongoose.connection.name);
//     }catch(err){
//         console.log(err);
//     }
// }

// module.exports = checkConnection;


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
