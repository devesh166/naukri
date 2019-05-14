const mongoose = require('mongoose');
var schema1 = mongoose.Schema;
var jobSchema = new schema1({
    user_id : { type: String, require: true },
    role: {type: String, required: true},
    name : {type: String, required: true},
    designation : {type: String, required: true},
    salary : {type: Number, required: true},
    location: {type: String, default: 'Gurgaon'},
    description : {type : String},
    // {
    //     long: {type: Number,default : 28.4595},
    //     lat: {type: Number,default : 77.0266}
    // }
    
}  , { versionKey: false })

 module.exports =mongoose.model('job',jobSchema);
