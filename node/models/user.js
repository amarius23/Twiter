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
    }
});

// Define a custom method to check if the provided password matches the hashed password stored in the database
UserSchema.methods.isValidPassword = async function(password) {
    try {
        // Use the 'authenticate' method provided by passport-local-mongoose to validate the password
        const isValid = await this.authenticate(password);
        return isValid;
    } catch (error) {
        // Handle any potential errors
        console.error('Error validating password:', error);
        return false;
    }
};

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);