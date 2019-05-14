
const apply = require('../model/applyModel');
const apply_enum = require('../enum/apply')


exports.applyJob = (req, res) => {
    let applyJob = new apply();

    applyJob.job_status = apply_enum[req.body.job_status];
    applyJob.user_id = req.body.user_id;
    applyJob.job_id = req.body.job_id;
    applyJob.name = req.body.name;
    applyJob.role = req.body.role;
    applyJob.description = req.body.description;
    applyJob.salary = req.body.salary;
    applyJob.designation = req.body.designation;
    applyJob.location = req.body.location;
    applyJob.save((err, users) => {
        if (err) {
            res.send(err)
        } else {

            res.send(users);
        }
    })



}


exports.appliedJobs = (req, res) => {
    console.log(req.body.user_id)

    apply.find({ user_id: req.body.user_id })
        .exec((err, user) => {
            if (err) {
                console.log("No data found")
                res.send("error")
            } else {
                console.log(user)
                res.send(user)
            }

        })

}
exports.getAplied = (req, res) => {
    apply.find({ name: req.body.name })
        .exec((err, user) => {
            if (err) {
                console.log("No data found")
                res.send("error")
            } else {
                console.log(user)
                res.send(user)
            }

        })
}

exports.changeStatus = (req, res) => {
    apply.findOneAndUpdate({ _id: req.body.id }, { $set: { "job_status": req.body.status } }, { new: true }, (err, element) => {
        if (err) {
            res.send(err)
        } else {

            res.send(element);
        }
    })
}