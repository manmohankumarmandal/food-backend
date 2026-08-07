import {mongoose} from "mongoose";
const {Schema}=mongoose;
const listSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        filename:String,
        url:String,
        
    },
    price:{
        type:Number,

    },
    category:String,
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant"

    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})
const list=new mongoose.model("List",listSchema)
export default list;