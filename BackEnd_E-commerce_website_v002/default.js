const products = require("./constants/data");
const product = require("./model/product.schema");
const { generateEmbedding } = require("./utils/geminiService");





const defaultData = async()=> {
    try{
        for(const item of products) {

            const textToEmbed = `Category: ${item.category}. Name: ${item.title.longTitle}. Description: ${item.description}`;
            const vector = await generateEmbedding(textToEmbed);

            await product.updateOne(
                { id: item.id },
                { $set: {...item, embedding: vector} },
                { upsert: true }
            );
            console.log(`vector saved for: ${item.id}`);
        }
        console.log("Default Date & AI vector synced successfully");

    }catch(err){
        console.log("Error while syncing default data", err.message);
    }
}

module.exports = defaultData;