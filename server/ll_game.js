
var DECK = require('./deck')

class LL_GAME {
    constructor(player_list){
        this._players = player_list;
        this._turnList = this._shuffle([0,1,2,3])
        this._turn = 0;
        this._deck = new DECK();
        this._dealCards();
        this._sendHand(0);
        //this._sendHands();
        //console.log(player_list[0]);
        this._sendToPlayers('Game starts');
        console.log('Game started');
    }

    _sendToPlayer(playerIndex, msg){
        this._players[playerIndex].emit('game_message', msg);
    }
    _sendToPlayers(msg){
        this._players.forEach((player) => {
            player.emit('game_message', msg);
        });
    }

    _deletePlayer(player){
        delete this.player
    }

    _shuffle(list) {
        for(let i = list.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = list[i]
            list[i] = list[j]
            list[j] = temp
          }
        return list
    }

    _updateTurn(){
        if(this._turn == this._turnList.length - 1){
            this._turn = 0;
        } else {
            this._turn++;
        }
    }

    _dealCards(){
        this._players.forEach((player, idx) => {
            this._dealCard(idx);
        });
    }   

    _dealCard(playerIdx){
        this._players[playerIdx].hand.push(this._deck.deal())
        console.log('Player' + playerIdx + ': ' + this._players[playerIdx].hand)
    }

    _sendHand(playerIdx){
        this._players[playerIdx].emit('hand', this._players[playerIdx].hand);
    }
    _sendHands(){
        this._players.forEach((player, idx) => {
            this._sendHand(idx);
        });
    }
}
module.exports = LL_GAME;

//export default LL_GAME;