// Load environment variables from .env file
require('dotenv').config()
// Import the required libraries
const { Pinecone } = require("@pinecone-database/pinecone");

// Setup pinecone client SDK
const pinecone = new Pinecone({
    apiKey: 'd8412dc6-f006-4fc7-b055-e389b2ca80a1'
});

class Processor {
    constructor() {
        this.pineconeApiKey = process.env.PINECONE_API_KEY;
        this.huggingFaceApiKey = process.env.HUGGINGFACE_API_KEY;
        this.index = null;
        this.documentStore = null;
        this.docs = null;
    }

    preprocessText(path) {
        
    }
}

module.exports = Processor;