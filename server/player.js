class PLAYER {
    constructor(socket){
        //this._id = id;
        //this._name = name;
        this._hand = [];
        this._discards = [];
        //this._socket = socket;
        // socket.on("evalServer", (data) => {
        //     if(!DEBUG)
        //         return;
        //     var res = eval(data);
        //     socket.emit('evalAnswer', res);
        //     console.log(data);
         //});
        // this._socket = socket;
        // this._socket.on('evalServer', function(data){
        //     if(!DEBUG)
        //         return;
        //     var res = eval(data);
        //     this._socket.emit('evalAnswer', res);
        // });
        // this._onConnect(socket){

        // }
        //this._socket = socket;
        //this.onConnect(this._socket);
    }

    discard(idx){
        this._discards.push(this._hand.slice(idx,1))
    }
}
module.exports = PLAYER;


// class PLAYER {
//     constructor(id, name) {
//         var self = {
//             id: id,
//             name: name,
//         };
//         Player.list[id] = self;
//         return self;
//     }
//     static onConnect(socket) {
//         var player = Player(socket.id, socket.name);``
//         socket.on('evalServer', function (data) {
//             if (!DEBUG)
//                 return;
//             var res = eval(data);
//             socket.emit('evalAnswer', res);
//         });
//         socket.on('sendMsgToServer', function (data) {
//             for (var i in SOCKET_LIST) {
//                 SOCKET_LIST[i].emit('addToChat', player.name + ': ' + data);
//             }
//         });
//     }
//     static onDisconnect(socket) {
//         console.log('Deleting: ' + socket.id);
//         delete Player.list[socket.id];
//     }
//     static updateNames() {
//         var playerNames = [];
//         for (var i in Player.list) {
//             var player = Player.list[i];
//             playerNames.push(player.name);
//         }
//         ;
//         return playerNames;
//     }
// }
// Player.list = {}


