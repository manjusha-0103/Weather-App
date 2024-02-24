const mongoose = require('mongoose')

const UserdataSchema = new mongoose.Schema(

    {   
        username: {
            type: String,
            required: [true, "Please provide a username"],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Please provide a email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
        },
        // isVerfied: {
        //     type: Boolean,
        //     default: false,
        // },
        // isAdmin: {
        //     type: Boolean,
        //     default: false,
        // },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
    },
    { timestamps: true }
)

const Userdata = mongoose.models.Userdata || mongoose.model('Userdata', UserdataSchema);

module.exports = Userdata;