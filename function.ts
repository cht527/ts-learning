let suits = ["hearts", "spades", "clubs", "diamonds"];

type SuitCard = {suit: string; card: number; };
function pickCard(x: SuitCard[]): number;
function pickCard(x: number):SuitCard;

function pickCard(x:SuitCard[] | number): number | SuitCard{
    if(typeof x === 'number'){
        return x
    }else {
        return {suit: '1', card: 0 }
    }
}
let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);