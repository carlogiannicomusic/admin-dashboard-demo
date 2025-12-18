'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/AuthContext'
import { LogIn, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [showCredentials, setShowCredentials] = useState(false)
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const result = login(email, password)
    if (!result.success) {
      setError(result.error)
    }
  }

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center p-4"
      style={{ fontFamily: '"Proxima Nova", "Helvetica Neue", "Avenir", -apple-system, BlinkMacSystemFont, sans-serif' }}
    >
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-black flex items-center justify-center">
              <span className="text-[#F2EC62] font-extrabold text-2xl">DR</span>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-black uppercase tracking-tight mb-2">
            Digital Renaissance
          </h1>
          <p className="text-sm font-semibold text-black/60 uppercase tracking-wide">
            Admin Portal Login
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white border border-black/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm font-semibold">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-black/10 focus:outline-none focus:border-[#F2EC62] text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 border border-black/10 focus:outline-none focus:border-[#F2EC62] text-sm font-semibold pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white hover:bg-[#F2EC62] hover:text-black transition-all font-bold uppercase text-sm tracking-wide"
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-black/10">
            <button
              onClick={() => setShowCredentials(!showCredentials)}
              className="text-sm font-bold text-black/60 hover:text-black uppercase tracking-wide"
            >
              {showCredentials ? '▼' : '▶'} Demo Credentials
            </button>

            {showCredentials && (
              <div className="mt-4 space-y-3">
                {[
                  { email: 'admin@drmi.edu', password: 'admin123', role: 'Admin' },
                  { email: 'teacher@drmi.edu', password: 'teacher123', role: 'Teacher' },
                  { email: 'student@drmi.edu', password: 'student123', role: 'Student' },
                ].map((cred, idx) => (
                  <div key={idx} className="bg-[#4db8d3]/10 p-3 text-xs font-semibold">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-black uppercase">{cred.role}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setEmail(cred.email)
                          setPassword(cred.password)
                        }}
                        className="text-black hover:underline uppercase text-xs"
                      >
                        Use These
                      </button>
                    </div>
                    <div className="text-black/70">
                      <div>Email: {cred.email}</div>
                      <div>Password: {cred.password}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-black/50 mt-6 font-semibold">
          © 2025 Digital Renaissance Institute for Creative Arts
        </p>
      </div>
    </div>
  )
}
