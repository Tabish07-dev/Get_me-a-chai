"use client"
import { SessionProvider, useSession } from "next-auth/react"
import { useEffect } from "react"

function SessionListener() {
  const { data: session } = useSession()

  useEffect(() => {
    if (!session?.user) return

    try {
      const key = 'gmac_users'
      const existing = JSON.parse(localStorage.getItem(key) || '[]')

      const user = {
        name: session.user?.name || '',
        email: session.user?.email || '',
        image: session.user?.image || '',
        savedAt: new Date().toISOString()
      }

      // Merge by email (if available), keep newest first
      const idx = existing.findIndex(u => u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase())
      if (idx === -1) existing.unshift(user)
      else existing[idx] = { ...existing[idx], ...user }

      // Cap stored users to 50 entries
      localStorage.setItem(key, JSON.stringify(existing.slice(0, 50)))
    } catch (err) {
      // ignore localStorage errors (e.g., blocked in private mode)
      // console.error('Could not save session user to localStorage', err)
    }
  }, [session])

  return null
}

export default function SessionWrapper({ children }) {
  return (
    <SessionProvider>
      <SessionListener />
      {children}
    </SessionProvider>
  )
}