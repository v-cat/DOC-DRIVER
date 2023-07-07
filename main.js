import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import dotenv from 'dotenv'
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter" //split the local file
import { PineconeClient } from "@pinecone-database/pinecone"  //vector database pinecone
import { OpenAIEmbeddings } from "langchain/embeddings/openai" //convert local data into vectors
import { PineconeStore } from "langchain/vectorstores/pinecone"
import { Document } from "langchain/document";

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
    apiKey:'c927843d-2af6-4d8f-9138-5f9f170e6580',
    environment:  'asia-southeast1-gcp-free',
})
const indexName='doc-driver1'
// 删除 Pinecone
// await client.deleteIndex({ indexName:'doc-driver' });
// const createRequest = {
// 	name: indexName,
// 	dimension: 1024,
// 	// metric,
//   };
//   新建 Pinecone
//   await client.createIndex({ createRequest });
//   console.log(client)
// construct an Index object
  const pineconeIndex = client.Index('doc-driver')
// console.log('pineconeIndex',pineconeIndex)
//embed the markdown documents
const doc = [
	new Document({
	  metadata: { foo: "bar" },
	  pageContent: "pinecone is a vector db",
	}),
	new Document({
	  metadata: { foo: "bar" },
	  pageContent: "the quick brown fox jumped over the lazy dog",
	}),
	new Document({
	  metadata: { baz: "qux" },
	  pageContent: "lorem ipsum dolor sit amet",
	}),
	new Document({
	  metadata: { baz: "qux" },
	  pageContent: "pinecones are the woody fruiting body and of a pine tree",
	}),
  ];
try {
	PineconeStore.fromDocuments(doc,new OpenAIEmbeddings(),{
			pineconeIndex,
			// textKey:"jsdoc",
			// namespace:"doc-driver"
	})
	console.log('111111')
} catch (error) {
	console.log('2222222',error)
}


