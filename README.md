# devweekend_LangChain

This repository contains LangChain code-along notes covering 5+ chain types, built as part of a devweekend session.

## Project Structure

```
src/
  chains/         # Individual chain implementations
    retrieval-chain.ts   - Retrieval QA with vector store
    memory-chain.ts      - Conversational memory
    document-pipeline.ts - Loader → Splitter → Vectorstore
    agent-chain.ts       - LLM agent with tools
    api-comparison.ts    - LangChain vs raw API decisions
  utils/          # Shared utilities
docs/           # Additional documentation
```

## 5 Chain Types Covered

1. **Retrieval Chain** (`src/chains/retrieval-chain.ts`)
   - Builds a QA chain over documents using Pinecone vector store
   - Uses `RetrievalQAChain.fromStuffType` with OpenAI embeddings
   - Returns source documents along with answers

2. **Conversational Memory Chain** (`src/chains/memory-chain.ts`)
   - Maintains conversation history using `ChatMessageHistory`
   - Uses `RunnableWithMessageHistory` to persist context per session
   - Demonstrates remembering user name across multiple turns

3. **Document Pipeline** (`src/chains/document-pipeline.ts`)
   - Connects document loader (UnstructuredURLLoader) → text splitter (RecursiveCharacterTextSplitter) → vector store (Pinecone)
   - Full ETL pipeline for indexing documents
   - Can be extended for PDFs, local files, etc.

4. **Agent Chain** (`src/chains/agent-chain.ts`)
   - LLM-powered agent with tools using `initializeAgent`
   - Uses `ZERO_SHOT_REACT_DESCRIPTION` agent type
   - Includes Calculator tool, extensible for custom tools
   - Agent decides when to use tools vs direct response

5. **LangChain vs Raw API** (`src/utils/api-comparison.ts`)
   - Know when to use LangChain: prompt management, chains, memory, tool integration, type safety, debugging, testing
   - Know when raw API calls: minimal dependencies, maximum control, trivial operations

## Acceptance Criteria

- [x] Build a retrieval chain using LangChain and a vector store ✅
- [x] Use LangChain memory to maintain conversation context ✅
- [x] Connect a document loader and text splitter in a pipeline ✅
- [x] Know when to use LangChain vs writing raw API calls ✅

## Getting Started

```bash
# Install dependencies
npm install

# Run examples
npx ts-node src/chains/retrieval-chain.ts
npx ts-node src/chains/memory-chain.ts
# etc.
```