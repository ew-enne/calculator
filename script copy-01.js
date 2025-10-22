// Global variables

let firstEntry = false;
let entryArray = ['0'];
let operatorArray = [];
let operator;
let tempNumber;
let firstNumber;
let secondNumber;


// Math functions --------
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        console.log("😝 Division by zéro 💥 !!! Please chose a different number.");
    }
}
// Math functions --------


// Calculate result with two numbers and an operator
function operate(a, b, operator) {
    if (operator === 'add') {
        return add(a, b);
    } else if (operator === 'subtract') {
        return subtract(a, b);
    } else if (operator === 'multiply') {
        return multiply(a, b);
    } else if (operator === 'divide') {
        return divide(a, b);
    }
}


// Transform clicked buttons to usable values (shorter version)
function transformEntry(id) {
    if (id !== 'btn-dot') {
        return id.replace('btn-', '');
    } else {
        return '.';
    }
    
}


// Callback function for the readEntry function
function populateDisplay(entry) {
    tempNumber = document.querySelector(".screen").textContent = entry;

    // Check if entry is not / is a number
    // if (Number(entry) !== Number(entry)) {
    //     console.log("Entry is NOT a number");

    // } else {
    //     console.log("Entry is a number");
    //     tempNumber = document.querySelector(".screen").textContent = entry;
    // }
    
}


// Sets up event listeners on the buttons and calls the callback function when input changes
function readEntry(onNumberChange) {
    let inputs = [];
    let buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
        button.addEventListener("click", event => {
            let buttonId = event.target.id;

            //convert id to usable value using the transforEntry function
            let input = transformEntry(buttonId);

            // clear button resets everything
            if (input === 'clear') {
                inputs = [];
                entryArray = [];
                onNumberChange('0.00');
                return;
            }

            // populate operatorArray when operators are pressed
            console.log("firstEntry is : ", firstEntry);
            if (firstEntry !== false) {
                if (input === 'add') {
                    operatorArray.push(input);
                    console.log("Operator Array : ", operatorArray);
                    console.log("First number entered : ", tempNumber);
                    return;
                }
            }

            // if (input === 'add') {
            //     operatorArray.push(input);
            //     console.log("Operator Array : ", operatorArray);
            //     console.log("First number entered : ", tempNumber);
            //     return;
            // }

            if (input === 'subtract') {
                operatorArray.push(input);
                console.log("Operator Array : ", operatorArray);
                return;
            }

            if (input === 'multiply') {
                operatorArray.push(input);
                console.log("Operator Array : ", operatorArray);
                return;
            }

            if (input === 'divide') {
                operatorArray.push(input);
                console.log("Operator Array : ", operatorArray);
                return;
            }

            if (input === 'equal') {
                operatorArray.push(input);
                console.log("Operator Array : ", operatorArray);
                return;
            }

            // insert selected button value into inputs array

            // make sure that only one dot can be entered
            if (input === '.' && !entryArray.includes('.')) {
                inputs.push(input);
                entryArray = [...inputs]; // creates a copy of inputs array (not a reference to it)
            } else if (input === '.' && entryArray.includes('.')) {
                return;
            } else if (input !== 'back') {
                inputs.push(input);
            } else if (input === 'back') {     
            // undo last entry (remove last element in the entryArray)            
                inputs.splice(-1, 1);
                console.log("Inputs Array one step back :", inputs);
            }

            // build number from array values and call callback
            // let number = Number(inputs.join(''));
            let number = inputs.join('');
            entryArray = [...inputs];
            console.log("Entry Array is : ", entryArray);
            onNumberChange(number);
            console.log("Temp. Number : ", tempNumber);
        });
    });
}



readEntry(populateDisplay);