const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    FirstName : { 
        type: String, 
        required: [true, "First name is needed"], 
    },
    LastName : { 
        type: String, 
        required: [true, "Last name is needed"], 
    },
    Age : { 
        type: Number, 
        min : [15, "Minimum age is 15"],
        max : [100, "Maximum age is 100"],
    },
    Hobbies : { 
        type: [String],
        enum: ['Reading', 'Travelling', 'Cooking', 'Sports'], 
    },
    Password : { 
        type: String, 
        minlength : [13, "Password must be 13+ characters"],
    },
});

module.exports = mongoose.model("User", userSchema);