'use client'

import { useEffect, useState } from 'react'
import { auth } from '@/services/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/')
      } else {
        setUser(user)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/')
  }

  if (!user) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Welcome, {user.displayName}</h1>
      <img src={user.photoURL} alt="avatar" className="w-20 h-20 rounded-full" />
      <p>Email: {user.email}</p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  )
}
