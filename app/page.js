'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthContext'
import AdminDashboard from '@/components/AdminDashboard'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-black flex items-center justify-center mx-auto mb-4">
            <span className="text-[#F2EC62] font-extrabold text-2xl">DR</span>
          </div>
          <p className="text-sm font-bold text-black uppercase tracking-wide">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <AdminDashboard />
}
