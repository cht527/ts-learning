"use strict";
let suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x) {
    if (typeof x === 'number') {
        return x;
    }
    else {
        return { suit: '1', card: 0 };
    }
}
let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);
let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
