import { ConversationalRetrievalQAChain } from "langchain/chains"
import { PineconeClient } from "@pinecone-database/pinecone"  
import { PineconeStore } from "langchain/vectorstores/pinecone" 
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { OpenAI } from "langchain/llms/openai"
import dotenv from 'dotenv'
dotenv.config()

//initialize the OpenAI model to use to answer the question
const model = new OpenAI({
    temperature:0
})
//initialize vector library
const pineconeClient = new PineconeClient()
await pineconeClient.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
})

const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX)
const pineconeStore = await PineconeStore.fromExistingIndex(new OpenAIEmbeddings(),{
    pineconeIndex,
    textKey:"text",
	namespace:"JavaScriptDoc"
})

//create the chain using the OpenAI model
const chain = ConversationalRetrievalQAChain.fromLLM(model,pineconeStore.asRetriever(),{
	returnSourceDocuments:true  
})
//ask question
const newQuestion = "我是JS新手，给我一些学习建议"
const res = await chain.call({
    question:newQuestion,
    chat_history:[]
})
console.log(res)

//ask question with previous response as chat history.
const secondRes = await chain.call({
	question:"还有其他建议吗？",
	chat_history:[newQuestion,res.text]
})
console.log(secondRes)