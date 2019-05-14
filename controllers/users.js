const user = require('../model/userModel');
const role = require('../enum/role')


exports.getAllUsers = (req, res) => {
    user.find({}).exec((err, userlist) => {
        if (err) {
            console.log("No data found")
            res.send("error")
        } else {
            console.log("fetched user list")

            res.send(userlist)
        }

    })
}
exports.getUserByID = (req, res) => {
    user.findOne({ _id: req.params.id }).exec((err, user) => {
        if (err) {
            console.log("No data found")
            res.send("error")
        } else {
            console.log("fetched user list")
            res.send(user)
        }

    })

}
//--------Login----------------

exports.checkUser = (req, res) => {
    user.findOne({ email: req.body.email, password: req.body.password }).exec((err, user) => {
        if (err) {
            console.log("No data found")
            res.send(err)
        } else {
            if (user == '') {
                console.log("fetched user ")
                res.status(404)
            } else {
                console.log("fetched user ")
                res.send(user)
            }

        }

    })
}
//-----------------sign uo--------------
exports.postUser = (req, res) => {
    console.log(res)
    let userdata = new user();
    //  let roleNo = req.body.role;
    userdata.password = req.body.password;
    userdata.name = req.body.name;
    userdata.location = req.body.location;
    userdata.email = req.body.email;
    userdata.mobile = req.body.mobile;
    userdata.role = role[req.body.role];
    // if (req.body.location) {
    //     userdata.location.long = req.body.location.long;
    //     userdata.location.lat = req.body.location.lat;

    // }
    userdata.save((err, users) => {
        if (err) {
            res.send(err)

        } else {
            res.send(users);

        }
    })

}

exports.updateUser = (req, res) => {
    user.findOneAndUpdate({ user_id: req.params.id }, { $set: req.body }, { new: true }, (err, element) => {
        if (err) {
            res.send(err)
        } else {
            res.send(element);
        }
    })
}

exports.deleteUser = (req, res) => {
    user.findByIdAndDelete({ _id: req.params.id }, (err, element) => {
        if (err) {
            res.send(err)
        } else {
            res.send(element);
        }
    })
}