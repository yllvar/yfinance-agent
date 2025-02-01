import { useState, useEffect } from "react"
import { fetchFinancialData, fetchNews, analyzeFinancialData } from "@/utils/api"
import type { FinancialData, NewsItem } from "@/types"
import { FinancialOverview } from "./FinancialOverview"

interface FinancialDashboardProps {
  symbol: string
}

export function FinancialDashboard({ symbol }: FinancialDashboardProps) {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null)
  const [news, setNews] = useState<NewsItem[]>([])
  const [analysis, setAnalysis] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        setError(null)
        const [data, newsItems] = await Promise.all([fetchFinancialData(symbol), fetchNews(symbol)])
        setFinancialData(data)
        setNews(newsItems)
        const analysisResult = await analyzeFinancialData(data, newsItems)
        setAnalysis(analysisResult)
      } catch (err) {
        setError("Failed to fetch data. Please try again later.")
        console.error("Error fetching data:", err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [symbol])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return <div className="p-4 text-red-500 bg-red-100 rounded-md">{error}</div>
  }

  return (
    <div className="space-y-6">
      {financialData && <FinancialOverview data={financialData} />}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent News</h3>
        <ul className="space-y-2">
          {news.map((item, index) => (
            <li key={index} className="border-b border-gray-200 pb-2">
              <a href={item.url} className="text-blue-600 hover:underline">
                {item.title}
              </a>
              <p className="text-sm text-gray-600">
                {item.source} - {new Date(item.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">AI Analysis</h3>
        <p className="text-gray-700">{analysis}</p>
      </div>
    </div>
  )
}

