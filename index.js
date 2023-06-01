const express = require('express')
const app = express()
const port = 3000
const http=require("http")
const socketio= require("socket.io")
const bodyparser=require("body-parser")
app.use(express.static("public"));
const mongoose = require('mongoose');

app.set('view engine', "ejs");
var moment = require('moment');
const { count } = require('console')
var server=http.createServer(app);
var io=socketio(server);

app.use(bodyparser.urlencoded({extended: false}));

mongoose.connect('mongodb://127.0.0.1:27017/test-chat');

const cred = mongoose.model('passwords', { pass: String,roomname:String });


var sec="";
var i=1;
var room="";



app.get('/', (req, res) => {
  res.render("index")
})
app.post("/create",(req,res)=>{
  const roomname=req.body.roomname;
  const pass=req.body.pass;
  const creditional = new cred({ pass: pass,roomname:roomname });
      creditional.save().then(() => console.log('DOne'));
      res.redirect("/");
  
})
app.post("/room",(req,res)=>{
    const username=req.body.name;
    const roomname=req.body.roomname;
    const pass=req.body.password;
   
    cred.countDocuments({}).then((result,err)=>{

      if(result==0){
        const creditional = new cred({ pass: pass,roomname:roomname });
      creditional.save().then(() => console.log('DOne'));
        console.log("it is empty",result)
        res.redirect(`/room?username=${username}&roomname=${roomname}`)
      }
      else{ 
           cred.findOne({ pass: pass,roomname:roomname}).then((result) => {

        console.log( "i am result \t",result)
        if(result==null){
          res.render("create")
        }else{
          res.redirect(`/room?username=${username}&roomname=${roomname}`)
        }
       
      });
        

      }
    })



   
    sec=pass;
    room=roomname;
  
  
    
    
})
app.get('/room', (req, res)=>{
  

    res.render('chat')
})

const connectedUsers = new Map();
io.on("connection",(socket)=>{
  let currentRoom;
  
  socket.on("createmsg",(msg)=>{
    
    
    io.to(msg.roomname).emit("newmsg",{

      from:msg.from,
      text:msg.text,
      date:moment().format('LTS'),
      
    })
    
  })
  
  socket.on("join-username",(msg)=>{

    
    io.to(msg.roomname).emit("join-username",{
      username:msg.username

      
    })
    
  })
  socket.on('broadcastToRoom', (roomName, message) => {
    
    io.to(roomName).emit('newjoin',{message,date:moment().format('LTS')});
    
  });

  socket.on('joinRoom', (roomName) => {
    
    
    
    socket.join(roomName.roomname);
    
    currentRoom = roomName.roomname;
     connectedUsers.set(socket.id,roomName.username);

     io.to(roomName.roomname).emit('userJoined', Array.from(connectedUsers.values()));


  });


 
    

    socket.on('disconnect', () => {
      console.log("thank you")
      
    });
  })
  

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})