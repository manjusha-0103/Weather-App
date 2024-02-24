'use client'
import React from 'react'
import  "./navebar.css"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'


const Navebar = () => {
  const router = useRouter()
  const logout = async () => {
    try {
        await axios.get('/api/user/logout')
        toast.success('Logout successful')
        router.push('/login')
    } catch (error) {
        console.log(error.message);
        toast.error(error.message)
    }
  }
  return (
    <div>
        <nav>
            <Link href="/">Home</Link>
            <Link href="#">About</Link>
            <Link href="/Details">Weathers</Link>
            <Link href="#">Portefolio</Link>
            <button onClick={logout}>Logout</button>
            <div className="animation start-home"></div>
        </nav>
    </div>
  )
}

export default Navebar
