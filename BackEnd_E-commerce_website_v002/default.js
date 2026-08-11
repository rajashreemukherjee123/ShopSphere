const products = require("./constants/data");
const product = require("./model/product.schema");


const defaultData = async()=>{
    try{
        await product.deleteMany({});
        await product.insertMany(products);
        console.log("Data imported successfully");
    }catch(err){
        console.log("Error while inserting default data",err.message);
    }
}

////////////////////////////////////////////////////
// const defaultData = async () => {
//     try {
//         const count = await product.countDocuments();
//         if (count === 0) {
//             await product.insertMany(products);
//             console.log("Default data inserted");
//         } else {
//             console.log("Data already exists, skipping");
//         }
//     } catch (err) {
//         console.log("Error while inserting default data", err.message);
//     }
// }

module.exports = defaultData;