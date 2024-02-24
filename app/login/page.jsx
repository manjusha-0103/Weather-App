"use client";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./login.css"

export default function LoginPage() {
    const router = useRouter();
    const [errorm, setErrorm] = useState()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/user/login", user);
            console.log("Login success", response.data);
            if(response.status === 200 && response.data.success){
                toast.success("Login success");
                alert(response.data.message)
                router.push("/");
            }
            else {
                // Check for specific error messages
                if (response.data.error === "User does not exist") {
                    router.refresh()
                    alert("User does not exist. Please check your email.");
                    
                } else if (response.data.error === "Invalid password") {
                   
                    setErrorm(response.data.error)
                    alert("Invalid Password");
                    router.refresh()
                    console.log(errorm)
                } else {
                    // Handle other errors
                    router.refresh()
                    alert("An error occurred. Please try again later.");
                }
            }

        } catch (error) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    // useEffect(() => {
        
    // }, [user]);

    return (
    <div className="container">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />
        {errorm?<h3>{errorm}</h3>:<></>}
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
            onClick={onLogin}
            className="btn">Login here</button>
            <Link href="/signup"><h4>Visit Signup page</h4></Link>
        </div>
//         <div className="container">
//         <h1>{loading ? "Processing" : "Login"}</h1>
//    <form onSubmit={onLogin} method="post">
//        <h2>Login</h2>
//        <div className="input-field">
//            {/* <label htmlFor="email">Email</label> */}
//            <input type="text" id="email" name="email"  value={user.email} 
//            onChange={(e)=>{setUser({...user,email: e.target.value})}}/>
//        </div>
//        <div className="input-field">
//            {/* <label htmlFor="password">Password</label> */}
//            <input type="password" id="password" name="password" value={user.password} 
//            onChange={(e)=>setUser({...user,password:e.target.value})}/>
//        </div>
//        <button type="submit" className="btn">Login</button>
//        <Link href="/signup"><h3>If you don't have an account, create here</h3></Link>
//    </form>
// </div>
    )

}