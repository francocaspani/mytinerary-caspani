const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    name:{type:String, required:true},
    country:{type:String, required:true},
    img:{type:String, required:true},
    left:{type:Number, required:true},
    bottom:{type:Number, required:true}
})

const City = mongoose.model('city', citySchema)
module.exports = City