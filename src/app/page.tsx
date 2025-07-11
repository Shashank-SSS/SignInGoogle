import GoogleLoginButton from '@/components/GoogleLoginButton'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Google Login Demo</h1>
      <GoogleLoginButton />
    </main>
  )
}
