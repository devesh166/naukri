const mongoose = require('mongoose');
var schema = mongoose.Schema;
var applySchema = new schema({
  
      role: {type: String, required: true},
      name : {type: String, required: true},
      designation : {type: String, required: true},
      salary : {type: Number, required: true},
      location: {type: String, default: 'Gurgaon'},
      description : {type : String}, 
      job_status: { type: Number},
      user_id: { type: String, require: true },
      job_id: { type: String, require: true }

}  , { versionKey: false })

 module.exports =mongoose.model('apply',applySchema);
