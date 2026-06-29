import { Trash2 } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'

export default function HoldingsTable({ prices, loading }) {
    const { holdings, removeStock } = usePortfolio()

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
            <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Holdings</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Symbol', 'Company', 'Shares', 'Buy price', 'Current', 'P&L', 'Change', ''].map(h => (
                                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {holdings.map(stock => {
                            const current = prices[stock.symbol]?.price || stock.buyPrice
                            const pnl = (current - stock.buyPrice) * stock.shares
                            const change = prices[stock.symbol]?.changePercent || '0.00%'
                            const isUp = pnl >= 0
                            return (
                                <tr key={stock.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 font-semibold text-blue-600">{stock.symbol}</td>
                                    <td className="px-4 py-3 text-gray-700">{stock.name || '—'}</td>
                                    <td className="px-4 py-3 text-gray-700">{stock.shares}</td>
                                    <td className="px-4 py-3 text-gray-700">${stock.buyPrice.toFixed(2)}</td>
                                    <td className="px-4 py-3 font-medium">{loading ? <span className="text-gray-400">Loading...</span> : `$${current.toFixed(2)}`}</td>
                                    <td className={`px-4 py-3 font-medium ${isUp ? 'text-green-600' : 'text-red-500'}`}>{isUp ? '+' : ''}${pnl.toFixed(2)}</td>
                                    <td className={`px-4 py-3 text-xs font-medium ${isUp ? 'text-green-600' : 'text-red-500'}`}>{change}</td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => removeStock(stock.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                            <Trash2 size={15} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}