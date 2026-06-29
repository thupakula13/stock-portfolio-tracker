import { createContext, useContext, useState, useEffect } from 'react'

const PortfolioContext = createContext()

export function PortfolioProvider({ children }) {
    const [holdings, setHoldings] = useState(() => {
        const saved = localStorage.getItem('holdings')
        return saved ? JSON.parse(saved) : [
            { id: 1, symbol: 'AAPL', name: 'Apple Inc.', shares: 10, buyPrice: 150 },
            { id: 2, symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 5, buyPrice: 120 },
            { id: 3, symbol: 'MSFT', name: 'Microsoft', shares: 8, buyPrice: 310 },
        ]
    })

    useEffect(() => {
        localStorage.setItem('holdings', JSON.stringify(holdings))
    }, [holdings])

    const addStock = (stock) => {
        setHoldings(prev => [...prev, { ...stock, id: Date.now() }])
    }

    const removeStock = (id) => {
        setHoldings(prev => prev.filter(s => s.id !== id))
    }

    return (
        <PortfolioContext.Provider value={{ holdings, addStock, removeStock }}>
            {children}
        </PortfolioContext.Provider>
    )
}

export const usePortfolio = () => useContext(PortfolioContext)
