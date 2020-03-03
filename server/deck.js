class DECK {
    constructor(){
        this._cards = ['gaurd', 'gaurd', 'gaurd', 'gaurd', 'gaurd', 'priest', 'priest',
        'baron', 'baron', 'handmaid', 'handmaid', 'prince', 'prince', 'king', 'countess', 'princess'];
        //this._shuffledCards = shuffle()      
        this.shuffle() ;
        this._discard = this._cards.pop();
        this._discards = [];

    }

    shuffle() {
        for(let i = this._cards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = this._cards[i]
            this._cards[i] = this._cards[j]
            this._cards[j] = temp
          }
        return this._cards
    }

    deal(){
        return this._cards.pop(); 
    }

}

module.exports = DECK;