import { TrendingUp, TrendingDown, DollarSign, BarChart2 } from 'lucide-react'

export default function SummaryCards({ holdings, prices }) {
    const totalInvested = holdings.reduce((acc, h) => acc + h.shares * h.buyPrice, 0)
    const totalCurrent = holdings.reduce((acc, h) => {
        const price = prices[h.symbol]?.price || h.buyPrice
        return acc + h.shares * price
    }, 0)
    const totalPnL = totalCurrent - totalInvested
    const pnlPercent = ((totalPnL / totalInvested) * 100).toFixed(2)
    const isProfit = totalPnL >= 0

    const cards = [
        { label: 'Total invested', value: `$${totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Current value', value: `$${totalCurrent.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: BarChart2, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Total P&L', value: `${isProfit ? '+' : ''}$${totalPnL.toFixed(2)}`, icon: isProfit ? TrendingUp : TrendingDown, color: isProfit ? 'text-green-600' : 'text-red-600', bg: isProfit ? 'bg-green-50' : 'bg-red-50' },
        { label: 'Return', value: `${isProfit ? '+' : ''}${pnlPercent}%`, icon: isProfit ? TrendingUp : TrendingDown, color: isProfit ? 'text-green-600' : 'text-red-600', bg: isProfit ? 'bg-green-50' : 'bg-red-50' },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {cards.map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center mb-3`}>
                        <Icon className={color} size={18} />
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <p className={`text-lg font-semibold ${color}`}>{value}</p>
                </div>
            ))}
        </div>
    )
}
