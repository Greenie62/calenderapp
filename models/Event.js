const mongoose=require('mongoose');

const {Schema} =mongoose;


const eventschema=new Schema({
    day:String,
    name:String,
    start:Number,
    end:Number,
    description:String,
    data_time:Number,
    am_time:{
        type:Boolean,
        default:false
    }
})


const Events=mongoose.model("Event",eventschema);

module.exports=Events