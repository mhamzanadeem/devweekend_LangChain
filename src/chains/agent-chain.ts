import { ChatOpenAI } from 'langchain/chat_openai'
import { Tool } from 'langchain/tools'
import { AgentType, initializeAgent } from 'langchain/agents'
import { Calculator } from 'langchain/tools/calculator'

// Agent chain - LLM-powered agent with tools
async function createAgentChain() {
  const llm = new ChatOpenAI({ temperature: 0.7 })
  
  // Define tools for the agent
  const tools: Tool[] = [
    new Calculator(),
    // Add more tools as needed
  ]
  
  // Initialize the agent
  const agent = await initializeAgent(
    tools,
    llm,
    { agentType: AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose: true }
  )
  
  return agent
}

// Usage: Let the agent decide what to do
const agent = await createAgentChain()
const result = await agent.invoke({
  input: "What is 25 * 42 + sqrt(144)?
})
console.log(result.output)