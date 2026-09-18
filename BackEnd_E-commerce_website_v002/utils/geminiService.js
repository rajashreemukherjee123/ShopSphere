const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateEmbedding = async(text)=>{
    try{
        const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

        const result = await model.embedContent(text);
        const embedding = result.embedding;

        return embedding.values;

    }catch(err){
        console.log(err);
        throw err;
    }
};

module.exports = { generateEmbedding };