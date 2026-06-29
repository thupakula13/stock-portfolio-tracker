import { useState, useEffect } from 'react'
import { fetchStockPrice } from '../services/stockAPI'

export function useStockPrices(symbols) {
    const [prices, setPrices] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!symbols.length) return

        const fetchAll = async () => {
            setLoading(true)
            const results = {}
            for (let i = 0; i < symbols.length; i++) {
                const data = await fetchStockPrice(symbols[i])
                if (data) results[symbols[i]] = data
                if (i < symbols.length - 1) {
                    await new Promise(r => setTimeout(r, 15000))
                }
            }
            setPrices(results)
            setLoading(false)
        }

        fetchAll()
    }, [symbols.join(',')])

    return { prices, loading }
}
