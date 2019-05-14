const mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = new schema({
    password: { type: String, require: true },
    role : {type: Number,required: true},
    location:{type: String, default: 'Gurgaon'},
    email: { type: String, required: true, unique: true },
    name: {type: String, required: true},
    mobile:{type: Number,required: true},
}  , { versionKey: false })
  module.exports =mongoose.model('user',userSchema);