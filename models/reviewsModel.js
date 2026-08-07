import {mongoose} from "mongoose";
const {Schema}=mongoose;
const reviewSchema=new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    foodItem:{
        type:Schema.Types.ObjectId,
        ref:"list",
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    review:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }

})
const review=new mongoose.model("Review",reviewSchema)
export default review;