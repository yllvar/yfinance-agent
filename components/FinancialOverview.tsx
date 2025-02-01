import type { FinancialData } from "@/types"

interface FinancialOverviewProps {
  data: FinancialData
}

export function FinancialOverview({ data }: FinancialOverviewProps) {
  const isPositiveChange = data.change >= 0

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.symbol}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-3xl font-bold text-gray-900">${data.price.toFixed(2)}</p>
          <p className={`text-lg font-semibold ${isPositiveChange ? "text-green-600" : "text-red-600"}`}>
            {isPositiveChange ? "+" : ""}
            {data.change.toFixed(2)} ({((data.change / (data.price - data.change)) * 100).toFixed(2)}%)
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Volume: {data.volume.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Market Cap: ${(data.marketCap / 1e9).toFixed(2)}B</p>
          <p className="text-sm text-gray-600">P/E Ratio: {data.peRatio.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

