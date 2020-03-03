const express = require('express');
const app = express();
const server = require('http').Server(app);
const LL_GAME = require('./ll_game');
//var PLAYER = require('./player')

app.get('/',function(req, res) {
    //res.sendFile(__dirname + '/../client/index.html');
    //res.sendFile('/home/jonathanbell/LL3/client/index.html');
    res.sendFile('index.html', { root: "../client/"});
});
app.use('/client',express.static(__dirname + '/../client'));

server.listen(2000);
console.log('Server is running');

// var game = new LL_GAME(ps[0], 'k', 'jo', 'mike');
//console.log(game._deck.shuffle());

// console.log(game);

var DEBUG =  true;
var USERS = {
    'a':'b',
    'c':'d',
    'aa':'bb',
    'cc':'dd',
}

var isValidPassword = function(data){
    return USERS[data.username] === data.password;
};

var isEmptyUserPass = function(data){
    if(!data.username || !data.password){
        return true;
    } else {
        return false;
    }
}

var isUsernameTaken = function(data){
    return USERS[data.username];
};

var addUser = function(data){
    USERS[data.username] = data.password;
}

//Global list of ALL sockets. Used for all communication
var SOCKET_LIST = {}
var game = undefined;

// Temporary player class with list used until game is full.
// Reset each time a new game starts
class Player {
    constructor(socket) {
        this._socket = socket;
        Player.list[this._socket.id] = socket;
        // var self = {
        //     socket: socket
        // };
        // Player.list[socket.id] = self;
        // return self;
    };

    static onConnect(socket) {
        //Update everyone that I am in the que
        this.sendQue(socket)

        socket.on('evalServer', function (data) {
            if (!DEBUG)
                return;
            var res = eval(data);
            socket.emit('evalAnswer', res);
        });

        socket.on('sendMsgToServer', function (data) {
            for (var i in Player.list) {
                //console.log(this);
                SOCKET_LIST[i].emit('addToChat', this.name + ': ' + data);
            }
        });
    };

    static onDisconnect(socket) {
        console.log('Deleting: ' + socket.id);
        delete Player.list[socket.id];
        Player.sendQue(socket);
    }

    // Send everyone in the playerlist their name as well as everyone in the que
    static sendQue(socket) {
        var playerNames = Player.updateNames()
        for(var i in Player.list){
            var socket = SOCKET_LIST[i];
            //socket.emit('Players', socket.name, playerNames)
            console.log(playerNames)
            socket.emit('Players', socket.name, playerNames)
        }
    }

    //Get the current playernames
    static updateNames() {
        var playerNames = [];
        for (var i in Player.list) {
            playerNames.push(SOCKET_LIST[i].name);
        }
        ;
        return playerNames;
    }
}
// Each game will have a copy of their player list
Player.list = {}

const io = require('socket.io')(server,{});

io.sockets.on('connection', function(socket){
    console.log('Socket Connection')
    //console.log(p)
    //console.log(Object.keys(PLAYERS).length)

    //socket.name = Math.random();
    SOCKET_LIST[socket.id] = socket;

    socket.on('signIn', function(data){
        //For now just allow one game at a time
        if(game==undefined){
            //Once the socket signs in add them to the que
            if(isValidPassword(data)){
                //Only four players at a time
                if(Object.keys(Player.list).length < 4){
                    //Create player
                    socket.name = data.username;
                    socket.hand = [];
                    new Player(socket);
                    Player.onConnect(socket);

                    // Send Everyone a msg that this player is ready
                    //Player.list
                    console.log('signed in')
                    socket.emit('signInResponse', {success:true});
                } else {
                    console.log('Too many players')
                    socket.emit('signInResponse', {success:false, msg:'Too many players'});
                    return
                }
                //Start the game once four players
                if(Object.keys(Player.list).length == 4){
                    game = new LL_GAME(Object.values(Player.list));
                    console.log(game._deck._cards);
                    console.log(game._deck._discard);
                    //console.log(game._deck.deal());
                    //console.log(game._deck._cards);

                    //Player.list = {}
                }

            } else {
                console.log('Invalid UP')
                socket.emit('signInResponse', {success:false, msg: 'Invalid username/password'});
            }

        } else {
            console.log('Game in progress')
            socket.emit('signInResponse', {success:false, msg:'Game in progress'});
            return
        }
        

    });

    socket.on('signUp', function(data){
        if(isUsernameTaken(data) || isEmptyUserPass(data)){
            //player.onConnect(socket);
            console.log('username taken')
            socket.emit('signUpResponse', {success:false, msg:'Username is taken'});
        } else {
            addUser(data);
            socket.emit('signUpResponse', {success:true});
        }

    });

    socket.on('disconnect', function(){
        console.log('Deleting: ' + socket.name)
        delete SOCKET_LIST[socket.id];
        Player.onDisconnect(socket);
        //player.sendQue(socket);
    });

});

// setInterval(function(){
//     var playerNames = Player.updateNames()

//     for(var i in SOCKET_LIST){
//         var socket = SOCKET_LIST[i];
//         //socket.emit('Players', socket.name, playerNames)
//         console.log(playerNames)
//         socket.emit('Players', socket.name, playerNames)
//     }
// },1000,25);