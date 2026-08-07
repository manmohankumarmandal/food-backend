import mongoose from "mongoose";
const restaurantSchema = new mongoose.Schema({
   name:String,
   image:String,
   address:String,
   rating:Number
})
const Restaurant=mongoose.model("Restaurant",restaurantSchema);
export default Restaurant;