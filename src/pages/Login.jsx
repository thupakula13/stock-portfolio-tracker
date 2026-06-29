import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp } from 'lucide-react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        localStorage.setItem('isLoggedIn', 'true')
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-sm">
                <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="text-blue-600" size={24} />
                    <span className="font-semibold text-gray-900 text-lg">StockTracker</span>
                </div>
                <h1 className="text-xl font-semibold text-gray-900 mb-1">Sign in</h1>
                <p className="text-sm text-gray-500 mb-6">Track your investments in real time</p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="email" required placeholder="Email address"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" required placeholder="Password"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="submit" className="w-full bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors">
                        Sign in
                    </button>
                </form>
                <p className="text-xs text-gray-400 mt-4 text-center">Demo: any email + password works</p>
            </div>
        </div>
    )
}