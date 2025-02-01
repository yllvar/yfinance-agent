"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { FinancialDashboard } from "@/components/FinancialDashboard"
import { ApiKeyInput } from "@/components/ApiKeyInput"
import { HelpCircle, LogOut } from "lucide-react"

export default function Home() {
  const [symbol, setSymbol] = useState<string>("")
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState<string | null>(null)

  useEffect(() => {
    const storedApiKey = localStorage.getItem("openai_api_key")
    if (storedApiKey) {
      setApiKey(storedApiKey)
    }
  }, [])

  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem("openai_api_key", key)
    setApiKey(key)
  }

  const handleLogout = () => {
    localStorage.removeItem("openai_api_key")
    setApiKey(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSelectedSymbol(symbol.toUpperCase())
  }

  if (!apiKey) {
    return <ApiKeyInput onSubmit={handleApiKeySubmit} />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#400090] text-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Quant Intern</h1>
          <div className="flex items-center space-x-4">
            <Link href="/guide" className="flex items-center text-white hover:text-gray-200">
              <HelpCircle className="w-5 h-5 mr-1" />
              How to use
            </Link>
            <button onClick={handleLogout} className="flex items-center text-white hover:text-gray-200">
              <LogOut className="w-5 h-5 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex items-center">
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Enter stock symbol (e.g., AAPL)"
                className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#400090]"
              />
              <button
                type="submit"
                className="bg-[#400090] text-white p-2 rounded-r-md hover:bg-[#5000b3] focus:outline-none focus:ring-2 focus:ring-[#400090]"
              >
                Analyze
              </button>
            </div>
          </form>
          {selectedSymbol && <FinancialDashboard symbol={selectedSymbol} />}
        </div>
      </main>
    </div>
  )
}

