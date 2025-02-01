import axios from "axios"
import type { FinancialData, NewsItem } from "@/types"

const OPENAI_API_BASE = "https://api.openai.com/v1"

function getApiKey(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("openai_api_key") || ""
  }
  return ""
}

const api = axios.create({
  baseURL: OPENAI_API_BASE,
})

api.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${getApiKey()}`
  config.headers["Content-Type"] = "application/json"
  return config
})

export async function fetchFinancialData(symbol: string): Promise<FinancialData> {
  try {
    // In a real-world scenario, this would be an API call to a financial data provider
    // For this example, we'll return mock data
    return {
      symbol,
      price: Number((Math.random() * 1000).toFixed(2)),
      change: Number((Math.random() * 20 - 10).toFixed(2)),
      volume: Math.floor(Math.random() * 10000000),
      marketCap: Math.floor(Math.random() * 1000000000000),
      peRatio: Number((Math.random() * 50).toFixed(2)),
    }
  } catch (error) {
    console.error("Error fetching financial data:", error)
    throw new Error("Failed to fetch financial data")
  }
}

export async function fetchNews(symbol: string): Promise<NewsItem[]> {
  try {
    // In a real-world scenario, this would be an API call to a news provider
    // For this example, we'll return mock data
    return [
      {
        title: `${symbol} Reports Strong Q2 Earnings`,
        url: "#",
        source: "Financial Times",
        date: new Date().toISOString(),
      },
      {
        title: `Analysts Upgrade ${symbol} Stock`,
        url: "#",
        source: "Wall Street Journal",
        date: new Date().toISOString(),
      },
      { title: `${symbol} Announces New Product Line`, url: "#", source: "Bloomberg", date: new Date().toISOString() },
    ]
  } catch (error) {
    console.error("Error fetching news:", error)
    throw new Error("Failed to fetch news")
  }
}

export async function analyzeFinancialData(data: FinancialData, news: NewsItem[]): Promise<string> {
  const prompt = `
    Analyze the following financial data and news for ${data.symbol}:
    
    Financial Data:
    Price: $${data.price}
    Change: $${data.change}
    Volume: ${data.volume}
    Market Cap: $${data.marketCap}
    P/E Ratio: ${data.peRatio}
    
    Recent News:
    ${news.map((item) => `- ${item.title} (${item.source})`).join("\n")}
    
    Provide a brief analysis of the stock's performance and potential outlook based on this information.
  `

  try {
    const response = await api.post("/chat/completions", {
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    })
    return response.data.choices[0].message.content
  } catch (error) {
    console.error("Error analyzing financial data:", error)
    throw new Error("Failed to analyze financial data")
  }
}

