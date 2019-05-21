const user = require('../model/userModel');
const jobs = require('../model/jobModel');
const role = require('../enum/role')



exports.getAllJobs = (req, res) => {

    jobs.find({}).exec((err, userlist) => {
        if (err) {
            console.log("No data found")
            res.send("error")
        } else {
            console.log("fetched user list")

            res.send(userlist)
        }

    })
}



exports.getAllJobs2 = (req, res) => {
    var pageNo = req.params.page;
    var size = 4;
    jobs.count({}, (err, total) => {
        if (err) {
            res.json({ 'message': err });
        }
        jobs.find({}, (err, data) => {
            if (err) {
                res.send({ 'message': err });
            }
            else {
                var pages = Math.ceil(total / size);
                console.log(total);
                res.json({ 'message': data, 'page': pages })
            }
        }).limit(size).skip(size * (pageNo - 1))
    })
}


exports.companyJobs = (req, res) => {
    jobs.find({ name: req.params.name }).exec((err, user) => {
        if (err) {
            console.log("No data found")
            res.send("error")
        } else {
            console.log("fetched user list")
            res.send(user)
        }

    })


}

exports.addJobs = (req, res) => {
    if (role[req.body.role] < 2) {
        user.find({ name: req.body.name })
            .then((ele) => {
                // res.send(ele)
                if (ele[0]) {


                } else {
                    res.send("user not registered")
                    return;
                }

            })

        let postJob = new jobs();

        postJob.name = req.body.name;
        postJob.user_id = req.body.user_id;
        postJob.location = req.body.location;
        postJob.description = req.body.description;
        postJob.designation = req.body.designation;
        postJob.salary = req.body.salary;
        postJob.role = role[req.body.role];


        postJob.save((err, users) => {

            if (err) {

                res.send(err)
            } else {

                res.send(users);
            }
        })

    } else {
        res.send("error:You are not Authorised to do this operation")
    }
}

exports.updateJobs = (req, res) => {
    jobs.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true }, (err, element) => {
        if (err) {
            res.send(err)
        } else {

            res.send(element);
        }
    })
}