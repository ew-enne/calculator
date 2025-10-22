// Global variables

let firstEntry = false; // to check if a number has been already entered or not
let operatorEntry = false; //to check if an operator has been alread entered or not
let entryArray = ['0.00'];
let operatorArray = [];
let operator;
let firstOperator;
let secondOperator;
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

            // ignore + - * / and = while no number has been entered

            if (firstEntry === false && 
                (input === 'add' || input === 'subtract' || input === 'multiply' || input === 'divide' || input === 'equal')) {
                    return;
            } else if (firstEntry !== false &&
                (input === 'add' || input === 'subtract' || input === 'multiply' || input === 'divide')) {
                    operatorArray.push(input);
                    console.log("Operator Array : ", operatorArray);
                    operatorEntry = true;
                    console.log("Operator entry : ", operatorEntry);
                    inputs = [];
                    // operator = operatorArray.pop();
                    firstOperator = operatorArray.pop();
                    console.log("operator is : ", operator);
                    operatorArray = [];
                    console.log("operatorArray : ", operatorArray);
                    console.log("First first number : ", firstNumber);
                    if (firstNumber === undefined) {
                        firstNumber = tempNumber;                        
                    } else if (firstNumber !== undefined) {
                        secondNumber = tempNumber;
                    }
                    console.log("First Numberrr : ", firstNumber);
                    console.log("Second Numberrr : ", secondNumber);
                    if (secondNumber !== undefined) {
                        result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
                        let roundResult = Math.round(result * 100) / 100;
                        console.log("result : ", result);
                        console.log("RESULT : ", roundResult);
                        onNumberChange(roundResult);
                    }    
                    return;
            } else if (firstEntry !== false && input === 'equal') {
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
                let number = inputs.join('');
                entryArray = [...inputs];
                console.log("Entry Array is : ", entryArray);
                onNumberChange(number);
                firstEntry = true; // first number has been entered
                // firstNumber = tempNumber;
                // console.log("First Number : ", firstNumber);
                
    })})
}



readEntry(populateDisplay);