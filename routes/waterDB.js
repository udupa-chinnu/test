const mongoose = require('mongoose')

const water = mongoose.Schema({
    queryID:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'USERcollection'
        }
    ],
    name:String
    
});

module.exports = mongoose.model("WaterDB",water);