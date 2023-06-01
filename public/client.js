

var socket=io()
function scrollToBottom() {
  var container = document.querySelector('#myDiv');
  container.scrollTop = container.scrollHeight;
}
var namestore=[];
var roomstore=[];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const username = urlParams.get('username');
const roomname = urlParams.get('roomname');



socket.on("userJoined",(connected)=>{
  // var changing_li=document.querySelector("#personlist li");
  
  
  // var t=document.querySelector("#personlist");
  // var listen=document.createElement("li")
  

  // listen.textContent=connected;
  // listen.className="persononline"
  // t.appendChild(listen)
  var liElements = t.children;
for (var j = 0; j < liElements.length; j++) {
  for(var k=0;k<liElements.length;k++ ){
    if(liElements[k]==liElements[j]){
      console.log("yes same");
    }
    else{
        
  var t=document.querySelector("#personlist");
  var listen=document.createElement("li")
  

  listen.textContent=connected;
  listen.className="persononline"
  t.appendChild(listen)
  var liElements = t.children;

    }
    // var li = liElements[j];

    
  }
  
}
})
socket.emit('broadcastToRoom', roomname, 'new user \t'+username+"\tjoined");

socket.on("connect",function(){
 
  console.log("hi user")
  socket.emit('joinRoom',{id: socket.id, username: username,roomname:roomname} );

})






// Display the received message

socket.emit("join-username",{username:username,roomname:roomname})

socket.on("join-username",function(getuser){
  var t=document.querySelector("#personlist");
  var listen=document.createElement("li")

  listen.textContent=getuser.username;
  listen.className="persononline"
  t.appendChild(listen)

})

socket.on("disconnect",()=>{


  
  console.log("I miis you")
})

socket.emit("createmsg",{
  from:"admin",
  text:"welcome to chat",
})
socket.on("newjoin",(newtext)=>{
  
var list = document.getElementById("myList");
var listItem = document.createElement("li");
listItem.textContent=newtext.message;
var paragraph = document.createElement("h6");
paragraph.textContent = newtext.date;
listItem.appendChild(paragraph);
list.appendChild(listItem);
var br=document.createElement("br")
list.appendChild(br)
scrollToBottom();
})
socket.on("newmsg",(newmsg)=>{
  console.log(newmsg);
var list = document.getElementById("myList");
var listItem = document.createElement("li");
listItem.textContent=newmsg.from+"\t:\t"+newmsg.text;
var paragraph = document.createElement("h6");
paragraph.textContent = newmsg.date;
listItem.appendChild(paragraph);
list.appendChild(listItem);
var br=document.createElement("br")
list.appendChild(br)
scrollToBottom();

})


document.querySelector("#submit-btn").addEventListener("click",function(e){
  e.preventDefault();
  socket.emit("createmsg",{
    from:username,
    text:document.querySelector('input[name="message"]').value,
    date:'moment().calendar()',
    roomname:roomname
  })
  document.querySelector('input[name="message"]').value=" ";
})
