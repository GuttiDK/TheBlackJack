let bunke = preGameSettings();
let deckSize = bunke.length;

function preGameSettings() {

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

function lavBunke(){
    let kulør = ["Hjerter", "Ruder", "Spar", "Klør"];
    let værdi = ["Es", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Knægt", "Dame", "Konge"];

    let deck = [];

    for (let i = 0; i < kulør.length; i++) {
        for (let j = 0; j < værdi.length; j++) {
            deck.push(new Card(kulør[i], værdi[j]));
        }
    }
    return deck;
}
return lavBunke();
}

function næsteKort(){
    let i = Math.floor(Math.random() * bunke.length);
    return bunke.splice(i, 1);
}

for (let i = 0; i < deckSize; i++) {
    let Card = næsteKort()[0];
    console.log(Card.kulør, Card.værdi);
}
