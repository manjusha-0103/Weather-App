
const {NextRequest,NextResponse }= require("next/server")
// const {Weather} = require('../../models/weatherModels');
import Weather from "@/app/models/weatherModels";
const  connectDB =require ("../../dbConfig/dbConfig")
const jwt =  require("jsonwebtoken");

const {getDataFromToken} = require("../../../helpers/getDataFromToken")



export async function POST(request){
    try{
        const {city, temperature, humidity, wind_speed, description} = await request.json();
        connectDB();
        const user = await getDataFromToken(request);

        if(user){

            const newdata = new  Weather({user,city, temperature, humidity, wind_speed, description})
            const newd = await newdata.save()
            return NextResponse.json({ message: "Weaather Data is saved" }, { status: 201 });
        }
        return NextResponse.json({ message: "You have to login first" }, { status: 400 });
    }
    catch(error){
        console.log(error)
    }
}

export async function GET(request){
    try{
        // const {city, temperature, humidity, wind_speed, description} = await request.json();
        connectDB();
        const user = await getDataFromToken(request)
        const cors = await Weather.find({user})
        console.log(cors)
        return NextResponse.json({ success: true,data : cors ,message: "Weaather Data is found" }, { status: 201 });
    }
    catch(error){
        console.log(error)
    }
}