const chats = require('../model/chatModel');

exports.getMessage=(req, res)=>{
    chats.find({$and : [{$or:  [{'senderID' : req.body.id1 },{'senderID' : req.body.id2}]}  , {$or:[{'recieverID' : req.body.id1 },{'recieverID' : req.body.id2}]} ]  })
    .exec((err, user) => {

        if (err) {
            console.log("No data found")
            res.send("error")
        } else {
            console.log(req.body.id1)
            console.log(req.body.id2)
            console.log(user)
            res.send(user)
        }

    })

}