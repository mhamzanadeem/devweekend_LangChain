import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

// Raw API call example - direct REST API
async function rawApiCall() {
  const { data, error } = await fetch('/api/endpoint')
    .then(res => res.json())
  return data
}

// LangChain wrapper - abstracts the API details
import { invoke } from '@langchain/core/tools'
import { tool } from '@langchain/core/agents'

const langChainTool = tool(
  async (input) => {
    const { data, error } = await supabase
      .from('table')
      .select('*')
      .eq('id', input.id)
    return data
  },
  { name: 'supabase_tool', description: 'Query Supabase via LangChain' }
)

// Use LangChain when you need: prompt management, chains, memory, 
// tool integration, type safety, debugging, testing.
// Use raw API calls when: you need minimal dependencies, 
// maximum control, or the operation is trivial.