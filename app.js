const chats = require('./model/chatModel');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.DEV1 || 3000;
const cors = require('cors');
const app = express();


// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// const http = require('http');
// const server = http.createServer(app);
// const socketIo  = require('socket.io')(server, { origins: '*:*'});
const http = require('http');
const io = require('socket.io');
 


const server = http.createServer(app);
const socketIo = io(server);
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use(cors());
const db = 'mongodb://127.0.0.1:27017/naukri'
mongoose.connect(db, (err) => {

    if (err) throw err;

    console.log('Successfully connected to db');

});


require('./route/route')(app)

// app.listen(port, () => {
//     console.log("server listening on port " + port);
// })

var users  = {};

var clients = []
// Setup socket.io
socketIo.on('connection', socket => {
  console.log(socket.handshake.query)
  var username = socket.handshake.query.username || ' ' ;
  var userID=socket.handshake.query.userID || ' ' ;
  username =username.trim();
  userID = userID.trim();
  // const sendTo = socket.handshake.query.sendTo;
  console.log(`${username} id : ${userID}connected`);
  clients.push(username)
  users[userID]  = socket;
  clients = [...new Set(clients)];
  console.log(users)
  socket.on('client:message', data => {
    console.log(data.sendToID)

    var userSocket  = users[data.sendToID] || null;
    // console.log(users['dev '])
    
    console.log(`${data.username}: ${data.message}`);
    chats.findOne({ $or:[{'senderID' : userID },{'senderID' : data.sendToID}]  , $or:[{'recieverID' : userID },{'recieverID' : data.sendToID}]   })
    .exec((err, chat) => {
      if (err) {
          console.log("No data found")
          // res.send("error")
      } else {
           
        if(chat===null){
            let tempChat = new chats();
            tempChat.senderID=userID;
            tempChat.recieverID = data.sendToID
            tempChat.message.data=data.message
            tempChat.message.name=username;
            tempChat.save((err, users) => {

              if (err) {
                console.log(err)
                  //res.send(err)
              } else {
               console.log(chat)
                 // res.send(users);
              }
          })
        }else{
          console.log(chat)
          chats.findOneAndUpdate({'_id': chat._id},{$push:{ message :
           { 'name':username,
            'data':data.message}
          }}, { new: true }, (err, element) => {
            if (err) {
                // res.send(console.log(chat))
                console.log(chat)
            } else {
              console.log(element)
                // res.send(element);
            }
        })
          console.log("fetched chats")

          // res.send(user)
        }

          
      }

  })

    // message received from client, now broadcast it to everyone else
    // socket.broadcast.emit('server:message', data);
    if(userSocket){
      if(userID !== data.sendID){
        console.log(userID)
        console.log(data.sendToID)
        userSocket.emit('server:message', data);
      
      }
      console.log("Message was succefully sent!");
    }else{
      console.log('User socket unavailable');
    }
  });
  socket.on('disconnect', () => {
    clients.pop();
    console.log(`${username} disconnected`);
  });
});


server.listen(process.env.PORT || port, () => {
  console.log('Server is running on Port: ', port);
});
// http.listen(6000, function(){
//     console.log('listening on *:6000');
//   });