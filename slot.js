// Slot Machine Using NodeJS
// steps:
// 1. Deposit Money
// 2. Determine where and how much to bet
// 3. Collect bet
// 4. Spin slots
// 5. If user won: give prize money else: boohoo
// 6. play again?

// requiring prompt ie user input-----
// the second set of () is calling the fxn
// const prompt = require("prompt-sync")();
const prompt = require("prompt-sync")();

// no. of rows and columns: the no of reels/slots and
// the no. of symbols
const ROWS = 3;
const COLUMNS = 3;

const SYMBOL_COUNT = {
    A: 8,
    B: 6,
    C: 4,
    D: 2
}

const SYMBOL_VALUES = {
    A: 2,
    B: 3,
    C: 4,
    D: 5
}

const deposit = () => {
    while (true){
        const depositAmount = prompt("Enter Amount: ");
        // to convert input into numbers
        const numDepositAmout = parseFloat(depositAmount);  

        if (isNaN(numDepositAmout)|| numDepositAmout <= 0){
            console.log("Invalid Entry! Try again.");
        } else{
            return numDepositAmout;
        }
    }
};

//how many lines players wanna bet on
const getSlots = () => {
    while (true){
        const slots = prompt("Enter Betting Slots(1-3): ");
        // to convert input into numbers
        const numSlots = parseFloat(slots);  

        //check if input valid
        if (isNaN(numSlots)|| numSlots <= 0 || numSlots > 3){
            console.log("Invalid Entry! Try again.");
        } else{
            return numSlots;
        }
    }
};

//allows us to see total bet
const getBet = (balance, betPerLine) =>{
    while (true){
        const betPerLine = prompt("Enter Bet Amount per line: ");
        // to convert input into numbers
        const numBet = parseFloat(betPerLine);  

        if (isNaN(numBet)|| numBet <= 0 || numBet > balance/betPerLine){
            console.log("Invalid Entry! Try again.");
        } else{
            return numBet;
        }
    }
};

const spinMaachine = () => {
    const symbols = [];

    // looping through and counting all the symbols in SYMBOL_COUNT
    for (const [symbol, count]  of Object.entries(SYMBOL_COUNT)){
        for (let i = 0; i < count; i++){
            symbols.push(symbol); // push() = append()
        }
    }

    // making the slots/columns of the Slot Machine
    // Then picking the symbol
    const reels = [];
    for (let i = 0; i < COLUMNS; i++){
        // reels.push([]): makes slots into the arr depending on 
        // no of columns ie slots
        // making a copy of symbols arr because when we roll
        // out a symbol we need to take it out/ pop it off
        // to ensure it doesn't get repeated. 
        // permutation combination brain mode engaged
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const randInt = Math.floor(Math.random()*reelSymbols.length);
            const selSymbol = reelSymbols[randInt];
            // appending to reels
            reels[i].push(selSymbol);
            reelSymbols.splice(randInt, 1);
        }
    }
    return reels;
};

 

let balance = deposit();
const slots = getBettingSlots();
const bet = getBet(balance, betPerLine);
const reels = spinMachine();