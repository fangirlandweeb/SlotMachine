// steps:
// 1. Deposit Money
// 2. Determine where and how much to bet
// 3. Collect bet
// 4. Spin slots
// 5. If user won: give prize money
// 6. play again?

// requiring prompt ie user input-----
// the second set of () is calling the fxn
// const prompt = require("prompt-sync")();
const prompt = require("prompt-sync")();

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
const getBet = (balance) =>{
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

let balance = deposit();
const slots = getBettingSlots();
const bet = getBet(balance);