import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { UnstructuredURLLoader } from 'langchain/document_loaders/url'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { fs } from 'fs/promises'
import path from 'path'

// Document loader and text splitter pipeline
async function documentPipeline() {
  // 1. Load documents from URL
  const loader = new UnstructuredURLLoader([
    'https://example.com/docs'
  ])
  const docs = await loader.load()
  
  // 2. Split text into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200
  })
  const splitDocs = await splitter.splitDocuments(docs)
  
  // 3. Create embeddings and store in vector DB
  const embeddings = new OpenAIEmbeddings()
  const vectorStore = await PineconeStore.fromDocuments(
    splitDocs,
    embeddings,
    { pineconeIndexName: 'langchain-devweekend' }
  )
  
  return vectorStore
}

// Usage: Build the full pipeline
const vectorStore = await documentPipeline()
const retriever = vectorStore.asRetriever(k=4)