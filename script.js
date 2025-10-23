// Global variables --------
let entryArray = [];
let operatorArray = [];
let operator;
let opCheck = 1; // check if any operator or equal button pressed ( 1 = yes, 0 = no)
let numberArray = [];
let result;


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
    return a / b;
}


// Calculate result with two numbers and an operator --------
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


// Transform clicked buttons to usable values (shorter version) --------
function transformEntry(id) {
    if (id !== 'btn-dot') {
        return id.replace('btn-', '');
    } else {
        return '.';
    }
    
}


// Callback function for the readEntry function (changes the screen) --------
function populateDisplay(entry) {
    screenNumber = document.querySelector(".screen").textContent = entry;    
}


// Set up event listeners on the buttons and calculator logic --------
function readEntry(onNumberChange) {
    let inputs = [];
    let entry;
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
                operatorArray = [];
                operator = undefined;
                opCheck = 1;
                numberArray = [];
                result = undefined;
                onNumberChange('0.00');
                return;
            }

            // populate operatorArray when operators are pressed

            if (opCheck === 1 && (input === 'add' || input === 'subtract' || input === 'multiply' || input === 'divide' || input === 'equal')) {

                if (input !== 'equal') {
                    operatorArray.push(input);
                    operator = input;
                }  
                return;
            }

            if (opCheck === 0 && (input === 'add' || input === 'subtract' || input === 'multiply' || input === 'divide' || input === 'equal')) {

                numberArray.push(entry);

                if (numberArray.length <= 1) {
                    result = Number(entry);
                }

                if (input !== 'equal') {
                    operatorArray.push(input);
                    operator = input;
                    opCheck = 1;
                } else if (input === 'equal') {
                    opCheck = 1;
                }     
                
                inputs = [];                    

                if (numberArray.length > 1) {
                    if (input !== 'equal') {
                        operator = operatorArray[operatorArray.length - 2];
                    } else {
                        operator = operatorArray[operatorArray.length - 1];
                    }
                    

                    let secondNumber = Number(numberArray[numberArray.length - 1]);

                    if (operator === 'divide' && secondNumber === 0) {
                        alert("😝 Division by zéro 💥 !!! Please restart the calculation.");
                        inputs = [];
                        entryArray = [];
                        operatorArray = [];
                        operator = undefined;
                        opCheck = 1;
                        numberArray = [];
                        result = undefined;
                        onNumberChange('0.00');
                        return;
                    } else {
                        if (opCheck === 1) {          
                            result = operate(result, secondNumber, operator);
                            roundResult = (Math.round(result * 100) / 100).toFixed(2);
                            onNumberChange(roundResult);
                            opCheck = 1;
                        }    
                    }    
                }
                return;

            }             
            

            // insert selected button value into inputs array

            // make sure that only one dot can be entered
            if (input === '.' && !entryArray.includes('.')) {
                inputs.push(input);
                entryArray = [...inputs]; // creates a copy of inputs array (not a reference to it)
                opCheck = 0;

            } else if (input === '.' && entryArray.includes('.')) {
                return;

            } else if (input !== 'back') {
                inputs.push(input);
                opCheck = 0;

            // undo last entry (remove last element in the entryArray) 
            } else if (input === 'back') {                
                inputs.splice(-1, 1);
            }

            // build number from array values and call callback
            let number = inputs.join('');
            entryArray = [...inputs];
            onNumberChange(number); // show / modify number on screen 

            entry = number;
                
    })})
}


readEntry(populateDisplay);