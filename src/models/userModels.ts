import mongoose from "mongoose";


const  userSchema = new mongoose.Schema({
    Id : {
        type: String
    },
    username: {
        type: String
    },
    email :    {
        type: String, 
        required : true, 
        unique : true
    },
    password : {
         type: String,
         required : true
    }

})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User


