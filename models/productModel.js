import {mongoose} from "mongoose";
const {Schema}=mongoose;
const productSchema= new Schema({
    title:{
        type:String,
        required:true,
    },
    image:{
        filename:String,
        url:String,
        
    },
     createdAt:{
        type:Date,
        default:Date.now
    }
   

})
const Product=new mongoose.model("Product",productSchema)
export default Product;