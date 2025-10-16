// Global variables
let globalNumber;
let operator;
let entryArray = [];
let operatorArray = [];


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
function handleNumberChange(entry) {
    // Check if entry is a number
    if (Number(entry) !== Number(entry)) {
        console.log("Entry is NOT a number");
    } else {
        console.log("Entry is a number");
        globalNumber = document.querySelector(".screen").textContent = entry;
    }
    
}


// The readEntry function sets up event listeners on the buttons and calls the callback function when input changes
function readEntry(onNumberChange) {
    let digits = [];
    let buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
        button.addEventListener("click", event => {
            let buttonId = event.target.id;

            //convert id to digit usable value using the transforEntry function
            let digit = transformEntry(buttonId);

            // clear button resets everything
            if (digit === 'clear') {
                digits = [];
                onNumberChange('0.00');
                return;
            } 

            // insert selected button value into digits array

            // make sure that only one dot can be entered
            if (digit === '.' && !entryArray.includes('.')) {
                digits.push(digit);
                entryArray = [...digits]; // creates a copy of digits array (not a reference to it)
            } else if (digit === '.' && entryArray.includes('.')) {
                return;
            } else {
            digits.push(digit);
            entryArray = [...digits];
}
            // build number from array values and call callback
            // let number = Number(digits.join(''));
            let number = digits.join('');
            onNumberChange(number);
        });
    });
}



readEntry(handleNumberChange);
