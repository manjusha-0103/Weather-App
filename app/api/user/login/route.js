"use server"
const  connectDB =require ("../../../dbConfig/dbConfig")
const Userdata = require("../../../models/userModels")
const { NextRequest, NextResponse } = require("next/server");
const  bcryptjs = require("bcryptjs");
const jwt =  require("jsonwebtoken");


connectDB()

export async function POST(request){
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody;
        // console.log(reqBody);

        //check if user exists
        const user = await Userdata.findOne({email})
        if(!user){
            return NextResponse.json({ error: "User does not exist",success: false}, {status: 400 });
        }
        console.log("user exists");
        
        
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password", success: false}, {status: 400})
        }
        console.log(user);
        
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" })

        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            success: true,
        }, {status: 200})
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}