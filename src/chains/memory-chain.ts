import { ChatMessageHistory } from 'langchain/stores/message'
import { RunnableWithMessageHistory } from 'langchain/runnables'
import { ChatPromptTemplate } from 'langchain/prompt'

// Conversation memory chain
const messageHistory = new ChatMessageHistory()

const prompt = ChatPromptTemplate.fromMessages([
  ['system', 'You are a helpful assistant. Remember the conversation context.'],
  ['placeholder', '{chat_history}'],
  ['human', '{input}']
])

// Store message history per session
const getMessageHistory = (sessionId: string) => messageHistory

const chainWithMemory = new RunnableWithMessageHistory(
  prompt.pipe(llm),
  getMessageHistory,
  inputMessages => inputMessages,
  outputMessages => outputMessages
)

// Usage with conversation context
const response1 = await chainWithMemory.invoke(
  { input: "My name is Hamza" },
  { configurable: { sessionId: 'user123' } }
)

const response2 = await chainWithMemory.invoke(
  { input: "What is my name?" },
  { configurable: { sessionId: 'user123' } }
)

console.log(response2.content) // Should remember "Hamza"