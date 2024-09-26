const mongoose = require("mongoose");



const AreaSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    zipcode :{
      type:String,
      required:true,
    },
    latitude:{
        type:Number,
      required:true,

    },

    longitude:{
        type:Number,
      required:true,

    },

    isActive:{
      type:Boolean,
      required:false,
      default:true,
    }
}, {
    timestamps:true
})

const areaModel = mongoose.model("Area", AreaSchema);
module.exports = areaModel