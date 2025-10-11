
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
        return "division by zéro !!!"
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

// console.log(operate(3, 0, 'divide'));



// transform clicked buttons to usable values
function transformEntry(entry) {
    switch (entry) {
        case "btn-1":
            return 1;
        case "btn-2":
            return 2;
        case "btn-3":
            return 3;
        case "btn-4":
            return 4;
        case "btn-5":
            return 5;
        case "btn-6":
            return 6;
        case "btn-7":
            return 7;
        case "btn-8":
            return 8;
        case "btn-9":
            return 9;
        case "btn-0":
            return 0;
        case "btn-dot":
            return '.';
        case "btn-divide":
            return 'divide';
        case "btn-multiply":
            return 'multiply';
        case "btn-subtract":
            return 'subtract';
        case "btn-add":
            return 'add';
        case "btn-back":
            return 'back';
        case "btn-clear":
            return 'clear';
        case "btn-equal":
            return 'equal';
    };
}

// the readEntry function calls a callback each time input changes
function readEntry(onNumberChange) {
    let digits = [];
    let buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
        button.addEventListener("click", event => {
            let buttonId = event.target.id;

            //convert id to digit usable value
            let digit = transformEntry(buttonId);

            // clear button resets everything
            if (digit === 'clear') {
                digits = [];
                onNumberChange('');
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

// Update screen every time number changes
readEntry((num) => {
    document.querySelector(".screen").textContent = num;
    console.log("Current number: ", num);
});

