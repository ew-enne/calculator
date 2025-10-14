// Global variables
let globalNumber;


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
        console.log("😝 Division by zéro 💥 !!! Chose a different number.");
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
    return id.replace('btn-', '');
}

// Callback function for the readEntry function
function handleNumberChange(entry) {
    globalNumber = entry;
    console.log("Global number = ", globalNumber);
    document.querySelector(".screen").textContent = entry;
    console.log("Current entry: ", entry);
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
            digits.push(digit);

            // build number from array values and call callback
            let number = Number(digits.join(''));
            onNumberChange(number);
        });
    });
}





// Variables for calculator operation
let number1;
let number2;
let operator = '';

let entryArr = [];

number1 = 3;
number2 = 1;
operator = 'divide';

let result = operate(number1, number2, operator);
// console.log(result);


readEntry(handleNumberChange);
