const { GoogleGenAI  } = require("@google/genai");

const ai = new GoogleGenAI ({apiKey: process.env.GEMINI_API_KEY});


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Generic retry wrapper for transient Gemini errors (503, 429)
const withRetry = async (fn, retries = 3, delayMs = 1000) => {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (err) {
            const isRetryable = err?.status === 503 || err?.status === 429;
            const isLastAttempt = attempt === retries;

            if (!isRetryable || isLastAttempt) throw err;

            console.log(`Gemini call failed (status ${err.status}), retrying in ${delayMs}ms... (attempt ${attempt + 1}/${retries})`);
            await sleep(delayMs);
            delayMs *= 2; // exponential backoff
        }
    }
};






const extractSearchKeywords = async (userQuery) =>{
    try{

        const prompt = `You are an e-commerce search expert. A user searched for: "${userQuery}".
        The search query might be in English, Bengali, Hindi, or mix of languages (romanized or alphabetic).
        Your task is to understand their actual shopping intent and translate it into 3 to 5 highly relevent, specific English product keywords or categories that exist in a shopping database.
        
        Examples for your understanding (Do not limit yourself to these):
        - If user searches "best device for office work" (English), you output: laptops, desktop computers, monitors
        - If user searches "comfortable running shoes for men" (English), you output: running shoes, sports shoes, sneakers, athletic footwear
        - If user searches "saste aur acche smart watch" (Hindi written in English/Hinglish), you output: smartwatches, affordable fitness trackers, digital watches
        - If user searches "ghar ki safai ke liye machine" (Hinglish), you output: vacuum cleaners, cleaning robots, floor cleaners
        - If user searches "bhalo gaan shonar jinish" (Bengali/Banglish), you output: headphones, earphones, bluetooth speakers
        - If user searches "lal ronger juto" (Banglish), you output: black shoes, black sneakers, black footwear
        - If user searches "मुझे एक अच्छा स्मार्टफोन चाहिए" (Hindi Devanagari), you output: smartphones, mobile phones, cell phones
        - If user searches "শীতের জন্য গরম জামাকাপড়" (Bengali script), you output: winter jackets, sweaters, hoodies, thermal wear
        
        
        Strict Rules:
        1. Do NOT write any conversational text, explanations, or sentences.
        2. Return ONLY a comma-separated list of English keywords.`;

        const response = await withRetry(() => 
            ai.models.generateContent({
                model: "gemini-flash-lite-latest",
                contents: prompt,
            })
        );
        
        const optimizedkeywords = response.text.trim();

        return optimizedkeywords;

    }catch(err){
        console.log(err);
        return userQuery;
    }
}






const generateEmbedding = async(text)=>{
    try{
        const response = await withRetry(() => 
            ai.models.embedContent({
                model: "gemini-embedding-001",
                contents: text,
            })
        );

        return response.embeddings[0].values;

    }catch(err){
        console.log(err);
        throw err;
        
    }
};

module.exports = { generateEmbedding, extractSearchKeywords };