var calculator = {
    read: read(), // запрашивает prompt два значения и сохраняет их как свойства объекта
    sum: sum(), // возвращает сумму этих двух значений
    mul: mul(), // возвращает произведение этих двух значений
    div: div(), // деление
    sub: sub(), // вычитание
    getResult: getResult() // - функция, возвращающая результат операции
};
var result = null;

function read() {
    read.oper1 = ( operand1 = +prompt('Введите число: ', '') );
    read.oper2 = ( operand2 = +prompt('Введите число: ', '') );
    
    return read;
}

function sum(operand1, operand2) {
    result = operand1 + operand2;
    
    return result;
}

function mul(operand1, operand2) {
    result = operand1 * operand2;
    
    return result;
}

function div(operand1, operand2) {
    if (operand2 !== 0) {
        result = operand1 / operand2;
    } else {
        result = 'Error 0';
    }
    
    return result;
}

function sub(operand1, operand2) {
    result = operand1 - operand2;
    
    return result;
}

function getResult(result) {
    return alert(result);
}

calculator.read();
console.log( calculator.sum(read.oper1, read.oper2) );
console.log( calculator.mul(read.oper1, read.oper2) );