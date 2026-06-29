import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function PnLBarChart({ holdings, prices }) {
    const data = holdings.map(h => {
        const current = prices[h.symbol]?.price || h.buyPrice
        const pnl = parseFloat(((current - h.buyPrice) * h.shares).toFixed(2))
        return { name: h.symbol, pnl }
    })

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 mb-4">P&L by stock</h3>
            <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(val) => [`$${val}`, 'P&L']} />
                    <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                        {data.map((entry, i) => (
                            <Cell key={i} fill={entry.pnl >= 0 ? '#10B981' : '#EF4444'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
