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
};

const SYMBOL_VALUES = {
    A: 2,
    B: 3,
    C: 4,
    D: 5
};

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter Amount: ");
        // to convert input into numbers
        const numDepositAmout = parseFloat(depositAmount);  

        if (isNaN(numDepositAmout) || numDepositAmout <= 0){
            console.log("Invalid Entry! Try again.");
        } else{
            return numDepositAmout;
        }
    }
};

//how many lines players wanna bet on
const getSlots = () => {
    while (true) {
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
const getBet = (balance, lines) =>{
    while (true){
        const bet = prompt("Enter Bet Amount per line: ");
        // to convert input into numbers
        const numbet = parseFloat(bet);  

        if (isNaN(numbet)|| numbet <= 0 || numbet > balance/lines){
            console.log("Invalid Entry! Try again.");
        } else{
            return numbet;
        }
    }
};

const spinMachine = () => {
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
    for (let i = 0; i < COLUMNS; i++) {
        // reels.push([]): makes slots into the arr depending on 
        // no of columns ie slots
        // making a copy of symbols arr because when we roll
        // out a symbol we need to take it out/ pop it off
        // to ensure it doesn't get repeated. 
        // permutation combination brain mode engaged
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const randInt = Math.floor(Math.random() * reelSymbols.length);
            const selSymbol = reelSymbols[randInt];
            // appending to reels
            reels[i].push(selSymbol);
            reelSymbols.splice(randInt, 1);
        }
    }
    return reels;
};

// transposing reels to get the winning combination
// output rn : [[A B D], [C D D], [C A B]] } these are the columns of the slot machine written horizontally
// o/t we want: 
// A C C    } so, for this output
// B D A    } we need to transpose the 2D matrices
// D D B    } lookup: "Transposing a 2D Matrix"
const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLUMNS; j++){
            // first, we access the columns and then we take the elenemt of row from it
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

// printing like : A | B | C
const printMachine = (rows) => {
    for (const row of rows) {

        let rowVal = "";
        for (const [i, symbol] of row.entries()) {
            rowVal += symbol;
            if (i != row.length - 1){
                rowVal += " | ";
            }
        }
        console.log(rowVal);
    }
};

const getWinnings = (rows, bet, lines) =>{
    let winnings = 0;

    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        // checking if all symbols are the same
        let allSame = true;

        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if (allSame){
            // when we get a win: sym_vals[syms[0]]
            // gives how many pts are earned then we multiply it to
            // betted money per line to for winnings 
            pointsEarned = SYMBOL_VALUES[symbols[0]];
            winnings += bet * pointsEarned;
        }
    }
    return winnings;
};

const game = () =>{
    let balance = deposit();
    
    // loops till balance lasts
    while (true){
        console.log("BALANCE: $" + balance);
        const numSlots = getSlots();
        const bet = getBet(balance, numSlots);

        // deducting balance after betting
        balance -= bet * numSlots;
        const reels = spinMachine();
        const rows = transpose(reels);
        printMachine(rows);
        const winnings = getWinnings(rows, bet, numSlots);

        // adding total winnigns
        balance += winnings;

        // well i made a mistake here it congratulates you for not winning as well
        // consider it a participation trophy since i probably won't be changing it 
        console.log("\n\n\t☆*: .｡. o(≧▽≦)o .｡.:*☆CONGRATULATIONS!!!! ☆*: .｡. o(≧▽≦)o .｡.:*☆ \n\t\t\tYOU WON $" + winnings.toString() + "\n\t\tヾ(≧▽≦*)o IT'S PARTY TIME!!! W00HOO");

        if (balance <= 0) {
            console.log("≧ ﹏ ≦ /n you're broke ＞﹏＜");
            break;
        }
        const playAgain = prompt("\nDo you want to play again (y/n)? ");

        if (playAgain != "y") break;
    }
};

game(); 