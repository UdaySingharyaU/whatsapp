import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    from:{
        type:String
    },
    to:{
        type:String
    },
    action:{
        type:String,
        enum:['ACCEPT','REJECT','PENDING'],
        default:'PENDING'
    },
    isRead:{
        type:String,
        default:false
    }
})


const Request = mongoose.model('Request',requestSchema);

export default Request;