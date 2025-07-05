'use client'

import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/services/firebase'
import { useRouter } from 'next/navigation'

export default function GoogleLoginButton() {
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      console.log("Logged in user:", result.user)
      router.push('/dashboard')
    } catch (err) {
      console.error('Google Sign-In Failed:', err)
    }
  }

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
    >
      Sign in with Google
    </button>
  )
}
