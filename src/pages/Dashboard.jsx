import { usePortfolio } from '../context/PortfolioContext'
import { useStockPrices } from '../hooks/useStockPrice'
import SummaryCards from '../components/SummaryCards'
import AddStockForm from '../components/AddStockForm'
import HoldingsTable from '../components/HoldingsTable'
import PortfolioPieChart from '../components/Charts/PieChart'
import PnLBarChart from '../components/Charts/BarChart'

export default function Dashboard() {
    const { holdings } = usePortfolio()
    const symbols = holdings.map(h => h.symbol)
    const { prices, loading } = useStockPrices(symbols)

    return (
        <main className="max-w-6xl mx-auto px-4 py-6">
            {loading && (
                <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-700">
                    ⏳ Fetching live prices... this takes ~45 seconds due to free API limits.
                </div>
            )}
            <SummaryCards holdings={holdings} prices={prices} />
            <AddStockForm />
            <HoldingsTable prices={prices} loading={loading} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PortfolioPieChart holdings={holdings} prices={prices} />
                <PnLBarChart holdings={holdings} prices={prices} />
            </div>
        </main>
    )
}
