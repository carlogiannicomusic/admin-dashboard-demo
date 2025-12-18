'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Demo credentials - in production, this would be an API call
    const validCredentials = [
      { email: 'admin@drmi.edu', password: 'admin123', name: 'Admin User', role: 'Super Administrator' },
      { email: 'teacher@drmi.edu', password: 'teacher123', name: 'Dr. Alessandro Rossi', role: 'Teacher' },
      { email: 'student@drmi.edu', password: 'student123', name: 'Sofia Martinez', role: 'Student' },
    ]

    const foundUser = validCredentials.find(
      cred => cred.email === email && cred.password === password
    )

    if (foundUser) {
      const userData = { email: foundUser.email, name: foundUser.name, role: foundUser.role }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      router.push('/')
      return { success: true }
    }

    return { success: false, error: 'Invalid email or password' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
