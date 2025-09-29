"use client"
import React, { useState } from 'react'
import Image from 'next/image'

export default function PaymentPage({ username }) {
  const [paymentform, setPaymentform] = useState({ name: '', message: '', amount: '' })

  const currentUser = { name: 'Tabish Ali Soomro', profilepic: '/tabi.png.jpg', coverpic: '' }

  const handleChange = (e) => setPaymentform({ ...paymentform, [e.target.name]: e.target.value })

  const pay = async (amount) => {
    // keep behavior unchanged for now
    alert('Payment of PKR ' + amount + ' initiated for ' + username)
  }

  return (
    <main>
      <div className="cover w-full bg-red-50 relative">
        <Image
          className="object-cover w-full h-48 md:h-[350px]"
          width={1200}
          height={350}
          src={currentUser.coverpic || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=350'}
          alt="Cover"
          unoptimized
        />
      </div>

      <section className="payment flex gap-3 w-[80%] mx-auto flex-col md:flex-row">
        <aside className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
          <h2 className="text-2xl font-bold my-5">Top Supporters</h2>
        </aside>

        <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
          <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
          <div className="flex gap-2 flex-col">
            <input onChange={handleChange} value={paymentform.name} name="name" placeholder="Enter Name" />
            <input onChange={handleChange} value={paymentform.message} name="message" placeholder="Enter Message" />
            <input onChange={handleChange} value={paymentform.amount} name="amount" placeholder="Enter Amount" />
            <button onClick={() => pay(Number.parseInt(paymentform.amount))} disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>
              Pay
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

