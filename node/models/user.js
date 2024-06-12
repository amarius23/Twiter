const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username:{
        type:String,  
        unique: true,
        required: true,
    },
    password:{
        type:String,  
        required: true,
        select: false,
        expose:false
    },
    profilePicture: {
        type: String,
    },
    bio: {
        type: String,
        maxlength: 500
    },
    location: {
        type: String,
        maxlength: 100
    }
});

module.exports = mongoose.model("User", UserSchema);