'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { auth } from '@/services/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  // Keep authentication logic
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
  
  // Keep logout handler
  const handleLogout = async () => {
    await signOut(auth)
    router.push('/')
  }

  // Keep loading state
  if (!user) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
          <nav>
            <ul>
              <li className="mb-2">
                <Link href="/dashboard">
                  <p className="text-blue-600 hover:underline">Chat</p>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/dashboard/profile">
                  <p className="text-blue-600 hover:underline">Profile</p>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/dashboard/settings">
                  <p className="text-blue-600 hover:underline">Settings</p>
                </Link>
              </li>
              {/* Add other common options here */}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content Area (Chat Page) */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Chat</h1>
        {/* This is where the chat interface will go */}
        <div className="bg-white rounded-lg shadow p-4">
          {/* Message display area */}
          <div className="h-96 overflow-y-auto mb-4 border p-2 rounded">
            {/* Example message */}
            <div className="mb-2">
              <span className="font-semibold">User:</span> Hello!
            </div>
          </div>
          {/* Message input */}
          <div className="flex">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
              Send
            </button>
          </div>
        </div>
        {/* Optional: Add logout button here or elsewhere in the dashboard layout */}
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
