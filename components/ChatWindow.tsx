import { useState } from "react"
import type { AgentInfo } from "@/types"
import { interactWithAgent } from "@/utils/api"

interface ChatWindowProps {
  agent: AgentInfo
}

interface Message {
  role: "user" | "agent"
  content: string
}

export function ChatWindow({ agent }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages([...messages, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await interactWithAgent(agent.id, input)
      const agentMessage: Message = { role: "agent", content: response }
      setMessages((prevMessages) => [...prevMessages, agentMessage])
    } catch (err) {
      setError("Failed to get a response from the agent. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`p-2 rounded ${message.role === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"}`}>
            {message.content}
          </div>
        ))}
        {isLoading && <div className="p-2 rounded bg-gray-100">Agent is thinking...</div>}
        {error && <div className="p-2 rounded bg-red-100 text-red-500">{error}</div>}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-2 border rounded"
          disabled={isLoading}
        />
      </form>
    </div>
  )
}

