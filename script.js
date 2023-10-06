const symbols = ["Heart", "Diamond", "Spade", "Club"];
const points = [1,2,3,4,5,6,7,8,9,10,10,10,10]
const value = ["Es", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

let deck = [];
let dealerHand = [];
let playerHand = [];
let dealerPoint = 0;
let playerPoint = 0;



class Card
{
    constructor(symbol,value,point)
    {
        this.symbol = symbol;
        this.value = value;
        this.point = point;
    }
}



// Create Cards and put them in the deck
function CreateDeck()
{
    for(let i = 0; i < symbols.length; i++){
        for(let j = 0; j < value.length; j++)
            deck.push(new Card(symbols[i], value[j], points[j]));
    }
}



// Take a card in deck and randomize it with another card in deck
function ShuffleDeck()
{
    CreateDeck();
    for(let i = 0; i < deck.length; i++){
        let safe = deck[i];
        let temp = Math.floor(Math.random() * deck.length);
        deck[i] = deck[temp];
        deck[temp] = safe;
    }
}



// Add card to hand of dealer or player and return Card to player or dealer
function AddCardToHand(array)
{
    if(Array.isArray(array)){
        const drawedCard = deck.shift();
        array.push(drawedCard);
        return drawedCard;
    }
}



// Takes hand and pluses point if there is a es and total point is under 12 it will plus 10
function PointResult(array)
{
    let points = 0;
    if(Array.isArray(array) && array.length > 0){
        array.forEach(x => {points += x.point});
        array.forEach(x => {
            if(x.point == 1 && points <= 11){
                points += 10
            }
        });
        return points;
    }
    else
        return points;
}





// Add 2 cards to dealerHand first card as hidden card, second as start card and only add the start card as point and then set all points for dealer 
function DealerStartHand()
{
    AddCardToHand(dealerHand);
    AddCardToHand(dealerHand);
    for(i = 0; i < dealerHand.length; i++){
        let foundCard = dealerHand[i];     
        if(i == 1){
            dealerPoint = PointResult(dealerHand);
        }
        else{                 
            var dealerTable = document.getElementById('dealerHand').getElementsByTagName('tbody')[0];
            var dealerRowHiddenCard = dealerTable.insertRow()
            var dealerCellHiddenCard = dealerRowHiddenCard.insertCell();
            var dealerHiddenCard = document.createTextNode("Hidden Card");
            dealerCellHiddenCard.appendChild(dealerHiddenCard);

            var dealerRowCard = dealerTable.insertRow()
            var dealerCellCard = dealerRowCard.insertCell();
            var dealerCard = document.createTextNode(foundCard.value + " " + foundCard.symbol);
            dealerCellCard.appendChild(dealerCard);

            document.getElementById("dealerInfo").innerHTML = "Dealer points: " + foundCard.point;
        }  
    }   
}



// Dealer draws cards until points is over playerPoints or 21 points if game is started
function DealerAutoDrawCard()
{
    if(document.getElementById("btnStart") === null){
    ShowDealerHiddenCard();
    if(playerPoint < 22){
        while(playerPoint > dealerPoint){
            let foundCard = AddCardToHand(dealerHand);
            dealerPoint = PointResult(dealerHand);

            var dealerTable = document.getElementById('dealerHand').getElementsByTagName('tbody')[0];
            var dealerRowCard = dealerTable.insertRow()
            var dealerCellCard = dealerRowCard.insertCell();
            var dealerCard = document.createTextNode(foundCard.value + " " + foundCard.symbol);
            dealerCellCard.appendChild(dealerCard);
        }
    }
    document.getElementById("dealerInfo").innerHTML = "Dealer points: " + dealerPoint;  
    GameEnd();
}
}



// Show the hidden card for the dealer and print it on the table
function ShowDealerHiddenCard()
{
    let foundCard = dealerHand[1];
    document.getElementById("dealerHand").deleteRow(1);

            var dealerTable = document.getElementById('dealerHand').getElementsByTagName('tbody')[0];
            var dealerRowCard = dealerTable.insertRow()
            var dealerCellCard = dealerRowCard.insertCell();
            var dealerCard = document.createTextNode(foundCard.value + " " + foundCard.symbol);
            dealerCellCard.appendChild(dealerCard);
}



// Draw card for player and print it if game is started and player points is under 21
function DrawedCardPlayer()
{
    if(document.getElementById("btnStart") === null)
    if(playerPoint < 22){
        let foundCard = AddCardToHand(playerHand);
        playerPoint = PointResult(playerHand);
        document.getElementById("playerInfo").innerHTML = "Player points: " + playerPoint;

        var playerTable = document.getElementById('playerHand').getElementsByTagName('tbody')[0];
        var playerRowCard = playerTable.insertRow()
        var playerCellCard = playerRowCard.insertCell();
        var playerCard = document.createTextNode(foundCard.value + " " + foundCard.symbol);
        playerCellCard.appendChild(playerCard);

        if(playerPoint == 21)
            DealerAutoDrawCard();
        if(playerPoint > 21){
            document.getElementById("dealerInfo").innerHTML = "Dealer points: " + dealerPoint;
            ShowDealerHiddenCard();
            GameEnd();
        }
    }
}



// End of game removing draw and stay button and printing out result of game and shows the new game button if player wanna play again.
function GameEnd()
{
    document.getElementById("btnDraw").remove();
    document.getElementById("btnStay").remove();
    document.getElementById("resultFrom").hidden = false;
    if(dealerPoint > 21 && playerPoint < 22)
        document.getElementById("result").innerHTML = "Player Wins";
    else if(playerPoint > 21 | (dealerPoint < 22 && playerPoint < dealerPoint))
        document.getElementById("result").innerHTML = "Dealer Wins";
    else
        document.getElementById("result").innerHTML = "Tie";
}



// Reload the page to start a new game
function StartNewGame(){
    location.reload();
}



// Prints the start game and the buttons for draw and stay
function NewGame()
{
    document.getElementById("btnStart").remove();
    document.getElementById("dealerHand").deleteRow(1);
    document.getElementById("playerHand").deleteRow(1);
    ShuffleDeck();
    DealerStartHand();
    DrawedCardPlayer();
    DrawedCardPlayer();  
}
