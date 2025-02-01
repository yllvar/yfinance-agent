import { useState, useEffect, type React } from "react"
import type { AgentInfo } from "@/types"
import { fetchAgents, createAgent } from "@/utils/api"

interface SidebarProps {
  onSelectAgent: (agent: AgentInfo) => void
}

export function Sidebar({ onSelectAgent }: SidebarProps) {
  const [agents, setAgents] = useState<AgentInfo[]>([])
  const [newAgentName, setNewAgentName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadAgents() {
      try {
        setIsLoading(true)
        setError(null)
        const fetchedAgents = await fetchAgents()
        setAgents(fetchedAgents)
      } catch (err) {
        setError("Failed to fetch agents. Please try again later.")
        console.error("Error fetching agents:", err)
      } finally {
        setIsLoading(false)
      }
    }
    loadAgents()
  }, [])

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newAgentName) {
      try {
        setIsLoading(true)
        setError(null)
        const newAgent = await createAgent(newAgentName)
        setAgents((prevAgents) => [...prevAgents, newAgent])
        setNewAgentName("")
      } catch (err) {
        setError("Failed to create a new agent. Please try again.")
        console.error("Error creating agent:", err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (isLoading) {
    return <aside className="w-64 bg-gray-100 p-4">Loading...</aside>
  }

  if (error) {
    return <aside className="w-64 bg-gray-100 p-4 text-red-500">{error}</aside>
  }

  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="text-xl font-semibold mb-4">Models</h2>
      {agents.length === 0 ? (
        <p>No models available.</p>
      ) : (
        <ul>
          {agents.map((agent) => (
            <li
              key={agent.id}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={() => onSelectAgent(agent)}
            >
              {agent.name}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleCreateAgent} className="mt-4">
        <input
          type="text"
          value={newAgentName}
          onChange={(e) => setNewAgentName(e.target.value)}
          placeholder="Custom model name"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Custom Model"}
        </button>
      </form>
    </aside>
  )
}

