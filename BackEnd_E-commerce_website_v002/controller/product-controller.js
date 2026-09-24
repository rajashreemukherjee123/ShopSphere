const product = require("../model/product.schema");
const { generateEmbedding, extractSearchKeywords } = require("../utils/geminiService");



const getProducts = async(req,res)=>{
    try{
        const products = await product.find({});

        res.status(200).json(products);

    }catch(err){
        res.status(500).json({message : err.message});
    }
}


// show product by id
const getProductById = async(req,res)=>{
    try{
        const id = req.params.id;
        const productObj = await product.findOne({ 'id': id })
        res.status(200).json(productObj);

    }catch(err){
        res.status(500).json({message: err.message})
    }
}


//show product by catagory
const getCategoryProduct = async(req,res)=>{
    try{
        const category = req.params.category;
        const categoryObj = await product.find({
            category: category
        });
        res.status(200).json(categoryObj);

    }catch(err){
        res.status(500).json({message: err.message});
    }
}


//show product by sections
const getSectionsProduct = async(req,res)=>{
    try{
        const sec = req.params.section;
        const sectionObj = await product.find({
            sections: sec
        })
        res.status(200).json(sectionObj);

    }catch(err){
        res.status(500).json({message: err.message});
    }
}


// AI vector search API
const aiSearchProduct = async(req,res)=>{
    try{
        const searchQuery = req.body.query;

        if(!searchQuery){
            return res.status(400).json({ message: "Please provide a search query"})
        }


        const optimizedQuery = await extractSearchKeywords(searchQuery);
        console.log("user-typed", searchQuery);
        console.log("AI converted to:", optimizedQuery);

        let queryVector;

        try{
            queryVector = await generateEmbedding(optimizedQuery);
        } catch(embedErr){
            const fallbackResult = await product.find({
                $or: [
                    // {name: {$regex: searchQuery, $options: "i"}},
                    {"title.shortTitle": {$regex: searchQuery, $options: "i"}},
                    {"title.longTitle": {$regex: searchQuery, $options: "i"}},
                    {category: {$regex: searchQuery, $options: "i"}},
                ],
            }).limit(10);

            return res.status(200).json(fallbackResult);
        }

        const searchResults = await product.aggregate([
            {
                "$vectorSearch": {
                    "index": "vector_index",
                    "path": "embedding",
                    queryVector,
                    "numCandidates": 50,
                    "limit": 10
                },
            },

            {
                "$project": {
                    "embedding": 0,
                    "score": { "$meta": "vectorSearchScore"}
                }
            },
            {
                "$match": {
                    "score": {
                        "$gte": 0.79
                    }
                }
            }
        ]);

        if (searchResults.length > 0) {
            const topScore = searchResults[0].score;
            const filtered = searchResults.filter(r => r.score >= topScore * 0.9);
            return res.status(200).json(filtered);
        }

        res.status(200).json(searchResults);

    }catch(err){
        res.status(500).json({ message: err.message });
    }
}



module.exports = {getProducts, getProductById, getCategoryProduct, getSectionsProduct, aiSearchProduct};