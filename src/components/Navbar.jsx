import { TrendingUp } from 'lucide-react'

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <TrendingUp className="text-blue-600" size={24} />
                <span className="font-semibold text-gray-900 text-lg">StockTracker</span>
            </div>
            <span className="text-sm text-gray-500">Portfolio Dashboard</span>
        </nav>
    )
}
