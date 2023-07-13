import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import dotenv from 'dotenv'
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter" //split the local file
import { PineconeClient } from "@pinecone-database/pinecone"  //vector database pinecone
import { OpenAIEmbeddings } from "langchain/embeddings/openai" //convert local data into vectors
import { PineconeStore } from "langchain/vectorstores/pinecone"
import { Document } from "langchain/document";
// const Koa = require('koa');
// import {Koa} from 'koa'

// const app = new Koa();

// app.use(async ctx => {
//     ctx.body = 'Hello Vercel, Hi Koa2';
// });


// app.listen(3008, () => {
//     console.log('3008项目启动')
// });
dotenv.config()

const loader = new PDFLoader("./test.pdf");
const rawDocs = await loader.load();
//split the local raw docs into chunks
const splitter = new RecursiveCharacterTextSplitter({
	chunkSize:1000,
	chunkOverlap:200
})
const docs = await splitter.splitDocuments(rawDocs)

//initialize vector library
const client = new PineconeClient()
await client.init({
    apiKey:'11ecfbde-9c68-4efe-a151-b1a058d5206b',
    environment:  'asia-southeast1-gcp-free',
})
// const indexName='doc-driver1'
const pineconeIndex = client.Index('index')
try {
	PineconeStore.fromDocuments(docs,new OpenAIEmbeddings(),{
			pineconeIndex,
			textKey:"jsdoc",
			namespace:"index"
	})
	console.log('111111')
} catch (error) {
	console.log('2222222',error)
}
