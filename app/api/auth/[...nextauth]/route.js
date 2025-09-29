import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

// Helper: which env vars are required
function getMissingEnv() {
  const missing = []
  if (!process.env.GITHUB_ID) missing.push('GITHUB_ID')
  if (!process.env.GITHUB_SECRET) missing.push('GITHUB_SECRET')
  if (!process.env.GOOGLE_CLIENT_ID) missing.push('GOOGLE_CLIENT_ID')
  if (!process.env.GOOGLE_CLIENT_SECRET) missing.push('GOOGLE_CLIENT_SECRET')
  return missing
}

const errorBody = (missing) => ({
  error: 'Server configuration error',
  message: 'Missing required environment variables for NextAuth providers.',
  missing
})

let _nextAuthHandler = null
function getNextAuthHandler() {
  if (_nextAuthHandler) return _nextAuthHandler
  const authOptions = {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    ],
    callbacks: {
      async session({ session }) {
        return session
      },
      async jwt({ token }) {
        return token
      }
    }
  }
  _nextAuthHandler = NextAuth(authOptions)
  return _nextAuthHandler
}

export async function GET(req) {
  const missing = getMissingEnv()
  if (missing.length > 0) {
    return new Response(JSON.stringify(errorBody(missing)), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
  const handler = getNextAuthHandler()
  return handler(req)
}

export async function POST(req) {
  const missing = getMissingEnv()
  if (missing.length > 0) {
    return new Response(JSON.stringify(errorBody(missing)), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
  const handler = getNextAuthHandler()
  return handler(req)
}