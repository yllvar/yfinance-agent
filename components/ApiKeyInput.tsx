import type React from "react"
import { useState } from "react"

interface ApiKeyInputProps {
  onSubmit: (apiKey: string) => void
}

export function ApiKeyInput({ onSubmit }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(apiKey)
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-[#400090] mb-6">Enter Your OpenAI API Key</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apiKey">
            API Key
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="apiKey"
            type="password"
            placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-[#400090] hover:bg-[#5000b3] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">Your API key is stored locally and never sent to our servers.</p>
    </div>
  )
}

