// import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured" //load local files of many types
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter" //split the local file
// import { PineconeClient } from "@pinecone-database/pinecone"  //vector database pinecone
// import { OpenAIEmbeddings } from "langchain/embeddings/openai" //convert local data into vectors
// import { PineconeStore } from "langchain/vectorstores/pinecone" //store local database into vector database 
// import dotenv from 'dotenv'
// dotenv.config()


// /**
//  * 引入 UnstructuredLoader 用于读取本地资料。“./vue3-document.md”为本地markdown文档。
//  * unstructuredLoader.load()为一个promise，
//  * 返回一个数组，数组每一项为将markdown文档拆分后的文档对象。
//  */
// const unstructuredLoader = new UnstructuredLoader("./vue3-document.md")
// const rawDocs = await unstructuredLoader.load()

// //split the local raw docs into chunks
// const splitter = new RecursiveCharacterTextSplitter({
// 	chunkSize:1000,
// 	chunkOverlap:200
// })
// const docs = await splitter.splitDocuments(rawDocs)

// //initialize vector library
// const pineconeClient = new PineconeClient()
// await pineconeClient.init({
//     apiKey:'c927843d-2af6-4d8f-9138-5f9f170e6580',
//     environment:  'asia-southeast1-gcp-free',
// })

// // construct an Index object
// const pineconeIndex = pineconeClient.Index('doc-driver')


// //embed the markdown documents
// try {
// 	PineconeStore.fromDocuments(docs,new OpenAIEmbeddings(),{
// 			pineconeIndex,
// 			textKey:"text",
// 			namespace:"vue3-document"
// 	})
// } catch (error) {
// 	console.log(error)
// }

import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";//load local files of many types
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter" //split the local file
import { PineconeClient } from "@pinecone-database/pinecone"  //vector database pinecone
import { OpenAIEmbeddings } from "langchain/embeddings/openai" //convert local data into vectors
import { PineconeStore } from "langchain/vectorstores/pinecone" //store local database into vector database 
import dotenv from 'dotenv'
dotenv.config()
//load local raw docs
const options = {
    apiKey: "asia-southeast1-gcp-free",
  };
const unstructuredLoader = new UnstructuredLoader("./vue3-document.md",'')
const rawDocs = await unstructuredLoader.load()

//split the local raw docs into chunks
// const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize:1000,
//     chunkOverlap:200
// })
// const docs = await splitter.splitDocuments(rawDocs)
console.log( process.env.PINECONE_API_KEY,'111111')

// //initialize vector library
// const pineconeClient = new PineconeClient()
// console.log( process.env.PINECONE_API_KEY,'111111')
// await pineconeClient.init({
//     apiKey: process.env.PINECONE_API_KEY,
//     environment: process.env.PINECONE_ENVIRONMENT,
// })
// // construct an Index object
// const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX)

// //embed the markdown documents
// try {
//     PineconeStore.fromDocuments(docs,new OpenAIEmbeddings(),{
//         pineconeIndex,
//         textKey:"text",
//         namespace:"vue3-document"
//     })
// } catch (error) {
//     console.log(error)
// }



