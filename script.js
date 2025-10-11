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

// let number1 = 0;
// let operator = '';
// let number2 = 0;

// let entry = [];


let clickedButtonId = '';
let digits = [];


function readEntry() {
    let buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("click", function(event) {
            clickedButtonId = event.target.id;
            // console.log(clickedButtonId);
            let digit = transformEntry(clickedButtonId);
            console.log(digit);
            digits.push(digit);
            console.log(digits);
            let number = Number(digits.join(''));
            console.log(number);
        });
    });
}


// transform clicked buttons to values
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
    };
}

readEntry();

// console.log(add(6, 5));
// console.log(subtract(6, 5.2358));
// console.log(multiply(6, 5));
// console.log(divide(6, -3));