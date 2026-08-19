# devweekend_LangChain

This repository contains LangChain code-along notes covering 5+ chain types, built as part of a devweekend session.

## Project Structure

```
src/
  chains/         # Individual chain implementations
  docs/           # Documentation and notes
  utils/          # Shared utilities
```

## Acceptance Criteria

- [x] Build a retrieval chain using LangChain and a vector store
- [x] Use LangChain memory to maintain conversation context
- [x] Connect a document loader and text splitter in a pipeline
- [x] Know when to use LangChain vs writing raw API calls

## Available Chains

1. **Retrieval Chain** - QA over documents with vector store
2. **Conversational Memory Chain** - Maintains conversation history
3. **Document Pipeline** - Loader → Splitter → Vectorstore → Retrieval
4. **Agent Chain** - LLM-powered agent with tools
5. **Stuff/Map/Reduce Chain** - Different document processing strategies