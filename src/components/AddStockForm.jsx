import { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { Plus } from 'lucide-react'

export default function AddStockForm() {
    const { addStock } = usePortfolio()
    const [form, setForm] = useState({ symbol: '', name: '', shares: '', buyPrice: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.symbol || !form.shares || !form.buyPrice) return
        addStock({ ...form, shares: Number(form.shares), buyPrice: Number(form.buyPrice) })
        setForm({ symbol: '', name: '', shares: '', buyPrice: '' })
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Add Stock</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Symbol (e.g. AAPL)" value={form.symbol}
                    onChange={e => setForm({ ...form, symbol: e.target.value.toUpperCase() })} />
                <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Company name" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} />
                <input type="number" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="No. of shares" value={form.shares}
                    onChange={e => setForm({ ...form, shares: e.target.value })} />
                <input type="number" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Buy price ($)" value={form.buyPrice}
                    onChange={e => setForm({ ...form, buyPrice: e.target.value })} />
                <button type="submit" className="md:col-span-4 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                    <Plus size={16} /> Add to Portfolio
                </button>
            </form>
        </div>
    )
}
