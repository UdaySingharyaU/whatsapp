import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
            'Please enter a valid email address'
        ],
        trim: true,
    },
    phoneNumber: {
        type: String,
        match: [
            /^(\+?\d{1,3}[- ]?)?\d{10}$/, 
            'Please enter a valid phone number'
        ],
        trim: true,
    },
    description:{
        type:String
    },
    imageUrl:{
        type:String
    }
})


const User = mongoose.model('User',userSchema);

export default User;