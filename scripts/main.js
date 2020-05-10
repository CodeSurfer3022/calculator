/***********************************************************************************************/
// Global values in use by all functions
let a = '';
let b = '';
let op = '';
let e;
/***********************************************************************************************/
function reset() {
    a = '';
    b = '';
    op = '';
    e = false;

    display.textContent = +a;
}

function add() {
    a = +a + +b;
}

function subtract() {
    a -= b;
}

function multiply() {
    a *= b;
}

function divide() {
    a /= b;
}

function toggleSign() {
    a *= -1;
}

function percentage() {
    a /= 100;
}

function operate(operator) {
    switch(operator) {
        case '+':
            add();
            break;
        case '-':
            subtract();
            break;
        case '*':
            multiply();
            break;
        case '/':
            divide();
            break;
        case '+-':
            toggleSign();
            break;
        case '%':
            percentage();
            break;
    }
}

function handleBinaryOperator() {
    lastOp = op;

    // If we just came from =, clear value in b
    if(e) {
        b = '';
        e = false;
    }
    
    if(lastOp != ''){
        lastOpButton = document.querySelector(`button[value = '${lastOp}']`);
        lastOpButton.classList.remove('selected-operator');
    }
    
    op = this.textContent;
    opButton = document.querySelector(`button[value = '${op}']`);
    opButton.classList.add('selected-operator');
    
    if (lastOp == '' || b == '') return;
        
    operate(lastOp);

    // reset b to take in next operand
    b = '';  

    display.textContent = a;
}

function equals() {
    if(op == '') return;
    opButton = document.querySelector(`button[value = '${op}']`);
    opButton.classList.remove('selected-operator');

    if (b == '') {
        b = a;
    }

    if(!e) e = true;

    operate(op);
    display.textContent = a;
}

function handleUnaryOperator() {
    if(a == '') return;
    const opButton = document.querySelector(`button[value='${this.value}']`);
    opButton.classList.add('selected-operator');

    operate(this.value);

    display.textContent = a;
}

function saveNumber() {
    if (op == '') {
        a += this.textContent;
        display.textContent = a;
    } else {
        b += this.textContent;
        display.textContent = b;
    }
}

const numbers = document.querySelectorAll('#numbers button');
numbers.forEach(number => number.addEventListener('click', saveNumber));

const binaryOperators = document.querySelectorAll('#binary-operators button');
binaryOperators.forEach(operator => operator.addEventListener('click',handleBinaryOperator));

const equalOperator = document.querySelector(`button[value = '=']`);
equalOperator.addEventListener('click', equals);

const unaryOperators = document.querySelectorAll('#unary-operators button');
unaryOperators.forEach(unaryOperator => unaryOperator.addEventListener('click', handleUnaryOperator));

const acButton = document.querySelector(`button[value = 'AC']`);
acButton.addEventListener('click', reset);

const display = document.querySelector('#display');
