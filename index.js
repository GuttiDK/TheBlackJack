let bunke = preGameSettings();
let deckSize = bunke.length;

function newGame() {
    if (bunke.length == 0)
    {
    bunke = preGameSettings();
    deckSize = bunke.length;
    }
}

function preGameSettings() {

class Card {
    constructor(kulør, værdi) {
        this.kulør = kulør;
        this.værdi = værdi;
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



function naesteKort(){
    let i = Math.floor(Math.random() * bunke.length);
    let Card = bunke.splice(i, 1)[0];
    if (bunke.length == 0) {
        console.log("Bunken er tom");
    }
    else {
        console.log(Card.kulør + " " + Card.værdi + " " + bunke.length + " kort tilbage");
    }

}

