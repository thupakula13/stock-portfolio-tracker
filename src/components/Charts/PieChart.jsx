import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4']

export default function PortfolioPieChart({ holdings, prices }) {
    const data = holdings.map(h => ({
        name: h.symbol,
        value: parseFloat((h.shares * (prices[h.symbol]?.price || h.buyPrice)).toFixed(2))
    }))

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Portfolio allocation</h3>
            <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={3} dataKey="value">
                        {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(val) => [`$${val.toFixed(2)}`, 'Value']} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}