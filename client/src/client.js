WIDTH=760;
HEIGHT=400;

var socket = io();

function startGame(){
    console.log('Start Game!');
    var startDiv = document.getElementById('start');
    startDiv.style.display = 'none';
}

//signDiv
const signDiv = document.getElementById('signDiv');
const signDivUsername = document.getElementById('signDiv-username');
const signDivSignIn = document.getElementById('signDiv-signIn');
const signDivSignUp = document.getElementById('signDiv-signUp');
const signDivPassword = document.getElementById('signDiv-password');

signDivSignIn.onclick = function(){
    socket.emit('signIn', {username:signDivUsername.value, password:signDivPassword.value});
};

signDivSignUp.onclick = function(){
    socket.emit('signUp', {username:signDivUsername.value, password:signDivPassword.value});
};

socket.on('signInResponse', function(data){
    if(data.success){
        signDiv.style.display = 'none';
        gameDiv.style.display = 'inline-block';
    } else
        alert(data.msg);
});

socket.on('signUpResponse', function(data){
    if(data.success){
        alert("Sign up successful");
    } else
        alert("Sign up unsuccessful\n" + data.msg);
});

//gameDiv
const gameDiv = document.getElementById('gameDiv');
const onlineUsersList = document.getElementById('online-users');
const chatText = document.getElementById('chat-text');
const chatInput = document.getElementById('chat-input');
const chatForm = document.getElementById('chat-form');
const ctx = document.getElementById("ctx").getContext("2d");
ctx.font = "30px Arial";

var images = [];

images.bg = new Image();
// images.bg.onload = function(){
//     drawBg();
//     //ctx.drawImage(images.bg, 0, 0, images.bg.width, images.bg.height);
// }
images.bg.src = "client/img/bg.jpg";
images.bg.draw = function(){
    ctx.drawImage(images.bg, 0, 0, images.bg.width/1.5, images.bg.height/1.5);
    //ctx.drawImage(img.bg, 0, 0);
    console.log('drawing');
};

images.cardSheet = new Image();

images.cardSheet.src = "client/img/cardsheet.jpg"
images.cardSheet.draw = function(){
    ctx.drawImage(images.cardSheet, 30, 30, images.cardSheet.width/3-30, images.cardSheet.height/3-30, 0, 0, images.cardSheet.width/4, images.cardSheet.height/4);
};


// Make sure the image is loaded first otherwise nothing will draw.
// bg.onload = function(){
//     ctx.drawImage(bg,0,0);   
// }

//ctx.drawImage(img.bg,0,0);
//img.onload = 
//drawBg();
//ctx.fillText('Online Users',100,100)
//ctx.fillText('11',400,100)

socket.on('evalAnswer', function(data){
    console.log(data);
});

socket.on('addToChat', function(data){
    chatText.innerHTML += '<div>' + data + '</div>';
    chatText.scrollTop = chatText.scrollHeight;
});

chatForm.onsubmit = function(e){
    e.preventDefault();
    if(chatInput.value[0] === '/')
        socket.emit('evalServer', chatInput.value.slice(1));
    else
        socket.emit('sendMsgToServer', chatInput.value);
    chatInput.value = ''
}

// socket.on('PlayerView', function(data){
//     //clear online users

//     //ctx.clearRect(0,0,500,500);
//     ctx.fillText(data, 200,200);
// });
socket.on('game_message', function(msg){
    //console.log(msg);
    chatText.innerHTML += '<div>' + 'Server:' + msg + '</div>';
    chatText.scrollTop = chatText.scrollHeight;
});

socket.on('Players', function(name, players){
    // clear online users list
    while(onlineUsersList.hasChildNodes()){
        onlineUsersList.removeChild(onlineUsersList.firstChild);
    }
    // Add users text
    var text = document.createTextNode("Online Users:");
    onlineUsersList.appendChild(text);
    //Add list
    players.forEach((player) => {
        var liTag = document.createElement('li');
        liTag.appendChild(document.createTextNode(player));
        onlineUsersList.appendChild(liTag);
    });
    
    //ctx.clearRect(0,0,500,500);
    //images.bg.draw();
    //images.cardSheet.draw();
    //ctx.fillText('Online Users',WIDTH/4-20,200);
    //console.log(players.length);
    //for(i=0; i<players.length; i++){
     //   ctx.fillText(players[i], WIDTH/4-20, 220 + (i*20));
    //}
    //ctx.fillText(players, 100, 100);
    //ctx.fillText(name, 250, 250);
    
    //console.log(players)
    //ctx.fillText(players, 100,100)
});

//Game logic

socket.on('hand', function(hand){
    // console.log(hand);
    chatText.innerHTML += '<div>' + 'Server:' + hand + '</div>';
    chatText.scrollTop = chatText.scrollHeight;
});