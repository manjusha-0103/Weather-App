const mongoose = require('mongoose')

const WeatherSchema = new mongoose.Schema(

    {   
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model for the author
            required: true,
        },
        city : {
            type :String,
            required : true
        },
        temperature:{
            type: String,
            requird : true
        },
        humidity :{
            type:String,
            required : true
        },
        wind_speed : {
            type: String,
            required : true
        },
        description : {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const Weather = mongoose.models.Weather || mongoose.model('Weather', WeatherSchema);

module.exports = Weather;