class Card {
    constructor(name, image, pos) {
        this.name = name;
        this.image = image.get(pos.x, pos.y, pos.w, pos.h);
        
    }

}



class Deck {
    constructor() {
        this.deck = [];
        this.deckImage = new Image();
        this.deckImage.src = 'client/cardsheet.jpg';
            
    }
}
