const mongoose = require('mongoose');

const mealModel = mongoose.Schema(
    {
        title: {type:String, required:true},
        author: {type:String, required:true},
        published_date: {type:String, default: Date.now},
        ingrediants: {type:Array, required:true},
        privacy: {type:Boolean, required:true},
        instructions: {type:String, required:false},
        image: {type:String, required:false},
    })

module.exports = mongoose.model("meals", mealModel);
