import axios from 'axios'

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY
const BASE_URL = 'https://www.alphavantage.co/query'

export async function fetchStockPrice(symbol) {
    try {
        const { data } = await axios.get(BASE_URL, {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol,
                apikey: API_KEY,
            }
        })
        const quote = data['Global Quote']
        if (!quote || !quote['05. price']) return null
        return {
            price: parseFloat(quote['05. price']),
            change: parseFloat(quote['09. change']),
            changePercent: quote['10. change percent'],
        }
    } catch (err) {
        console.error(`Failed to fetch ${symbol}:`, err)
        return null
    }
}
