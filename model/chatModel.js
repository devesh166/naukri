const mongoose = require('mongoose');
var schema = mongoose.Schema;
var chatSchema = new schema({
 
    senderID: {type: String, required: true},
    recieverID:{type: String, required: true},
    message:[ 
        { name:{type: String, required: true},
        data:{type: String, required: true}, 
        time:{ type : Date, default: Date.now } }
    ]
    
     
}  , { versionKey: false })
  module.exports =mongoose.model('chat',chatSchema);