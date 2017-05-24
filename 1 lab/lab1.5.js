var PLUS_OPERATOR = "+";
var MINUS_OPERATOR = "-";
var DIV_OPERATOR = '/';
var MULTI_OPERATOR = '*';

function askDigit() {
    //Возвращает число, введенный пользователем
    return ( operand = +prompt('Введите число: ', '') );
}

function askOperatior() {
    //TODO:: your code here
    //Возвращает операцию, введенную пользователем
    return ( operat = prompt('Введите действие: ', '') );
}

function calculate(operand1, operand2, operator) {
    var result = null;

    if (operator == PLUS_OPERATOR) {
        result = operand1 + operand2;
    } else if(operator == MINUS_OPERATOR) {
        result = operand1 - operand2;
    } else if(operator == DIV_OPERATOR) {
        if (operand2 !== 0) {
            result = operand1 / operand2;
        } else {
            result = 'Error 0';
        }
    } else if(operator == MULTI_OPERATOR) {
        result = operand1 * operand2;
    } else {
        alert("Unknown operator " + operator);
    }

    return result;
}

var operand1 = askDigit();
var operator = askOperatior();
var operand2 = askDigit();
var result = calculate(operand1, operand2, operator);

if (result) {
    alert(operand1 + operator + operand2 + "=" + result);
}