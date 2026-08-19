import { Document } from 'langchain/document'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { RetrievalQAChain } from 'langchain/chains'

// Build a retrieval chain with vector store
async function createRetrievalChain() {
  const embeddings = new OpenAIEmbeddings()
  
  // Initialize Pinecone vector store
  const vectorStore = new PineconeStore(embeddings, {
    pineconeIndexName: 'langchain-devweekend',
    namespace: 'docs'
  })
  
  // Create retrieval QA chain
  const chain = RetrievalQAChain.fromStuffType(llm, {
    retriever: vectorStore.asRetriever(),
    returnSourceDocuments: true
  })
  
  return chain
}

// Usage: Ask questions about the indexed documents
const chain = await createRetrievalChain()
const result = await chain.invoke({
  query: "What are the key LangChain concepts?"
})
console.log(result.sourceDocuments, result.result)