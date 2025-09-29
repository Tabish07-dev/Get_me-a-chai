"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Dashboard = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilepic: "",
    coverpic: "",
    razorpayid: "",
    razorpaysecret: ""
  })

  const [recentUsers, setRecentUsers] = useState([])

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push('/login')
      return
    }

    setForm({
      name: session.user?.name || "Tabish Ali Soomro",
      email: session.user?.email || "",
      username: session.user?.name?.toLowerCase().replace(/\s+/g, '') || "Developertabi07",
      profilepic: session.user?.image || "/tabi.png.jpg",
      coverpic: "",
      razorpayid: "",
      razorpaysecret: ""
    })
  }, [session, status, router])

  useEffect(() => {
    try {
      const key = 'gmac_users'
      const stored = typeof window !== 'undefined' ? localStorage.getItem(key) : null
      if (stored) setRecentUsers(JSON.parse(stored))
    } catch (err) {
      // ignore
    }
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    alert('Profile updated successfully!')
  }

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto py-5 px-4">
      <h1 className="text-center my-5 text-3xl font-bold text-white">Welcome to your Dashboard</h1>

      <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
        <div className="my-2">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Name</label>
          <input
            value={form.name}
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <div className="my-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
          <input
            value={form.email}
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="my-2">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Username</label>
          <input
            value={form.username}
            onChange={handleChange}
            type="text"
            name="username"
            id="username"
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div className="my-2">
          <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-white">Profile Picture URL</label>
          <input
            value={form.profilepic}
            onChange={handleChange}
            type="text"
            name="profilepic"
            id="profilepic"
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter profile picture URL"
          />
        </div>

        <div className="my-2">
          <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-white">Cover Picture URL</label>
          <input
            value={form.coverpic}
            onChange={handleChange}
            type="text"
            name="coverpic"
            id="coverpic"
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter cover picture URL"
          />
        </div>

        <div className="my-2">
          <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-white">Razorpay ID</label>
          <input
            value={form.razorpayid}
            onChange={handleChange}
            type="text"
            name="razorpayid"
            id="razorpayid"
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Razorpay ID"
          />
        </div>

        <div className="my-2">
          <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-white">Razorpay Secret</label>
          <input
            value={form.razorpaysecret}
            onChange={handleChange}
            type="password"
            name="razorpaysecret"
            id="razorpaysecret"
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Razorpay Secret"
          />
        </div>

        <div className="my-6">
          <button
            type="submit"
            className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Save
          </button>
        </div>
      </form>

      <div className="max-w-2xl mx-auto mt-8 p-6 bg-slate-900 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Your Profile Preview</h2>
        <div className="flex items-center gap-4">
          {form.profilepic && (
            <Image
              src={form.profilepic}
              alt="Profile"
              width={60}
              height={60}
              className="rounded-full object-cover"
              unoptimized
            />
          )}
          <div>
            <div className="text-white font-bold">{form.name || "Tabish Ali Soomro"}</div>
            <div className="text-slate-400">@{form.username || "Developertabi07"}</div>
            <div className="text-slate-400">{form.email || "tabish@example.com"}</div>
          </div>
        </div>
        {form.username && (
          <div className="mt-4">
            <p className="text-white">Your page URL:
              <span className="text-blue-400 ml-2">
                {typeof window !== 'undefined' ? window.location.origin : ''}/{form.username}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Recent visitors from localStorage */}
      <div className="max-w-2xl mx-auto mt-6 p-6 bg-slate-900 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Recent sign-ins</h3>
        {recentUsers.length === 0 ? (
          <p className="text-slate-400">No recent sign-ins found.</p>
        ) : (
          <ul className="space-y-3">
            {recentUsers.map((u, idx) => (
              <li key={u.email || idx} className="flex items-center gap-3">
                {u.image ? (
                  <Image src={u.image} alt={u.name || u.email} width={40} height={40} className="rounded-full object-cover" unoptimized />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white">?
                  </div>
                )}
                <div>
                  <div className="text-white font-medium">{u.name || u.email}</div>
                  <div className="text-slate-400 text-sm">{u.email}</div>
                  <div className="text-slate-500 text-xs">{new Date(u.savedAt).toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dashboard
