"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../login/login.css"

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/user/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    return (
        <div className="container">
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />

        <label htmlFor="username">Username</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="Username"
            />
        
        <label htmlFor="email">Email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="Email"
            />
        <label htmlFor="password">Password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="Password"
            />
            <button
            onClick={onSignup}
            className="btn">Signup here</button>
            <Link href="/login"><h4>Visit login page</h4></Link>
        </div>
        // <div className="container">
        // <form onSubmit={onSignup} method="post">
        //     <h2>Signup</h2>
        //     <div className="input-field">
        //         <label htmlFor="username">Username</label>
        //         <input type="text" id="username" name="username"  value={user.username} 
        //         onChange={(e)=>{setUser({...user,username: e.target.value})}}/>
        //     </div>
        //     <div className="input-field">
        //         <label htmlFor="email">Email</label>
        //         <input type="text" id="email" name="email"  value={user.email} 
        //         onChange={(e)=>{setUser({...user,email: e.target.value})}}/>
        //     </div>
        //     <div className="input-field">
        //         <label htmlFor="password">Password</label>
        //         <input type="password" id="password" name="password" value={user.password} 
        //         onChange={(e)=>setUser({...user,password:e.target.value})}/>
        //     </div>
        //     <button type="submit" className="btn">Login</button>
            
        // </form>
    
        // <Link href="/Lofin"><h3>If you have an account, login here</h3></Link>
        // </div>
    )

}