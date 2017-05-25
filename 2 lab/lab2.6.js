function NewCalculator() {
    this.read = function() { // запрашивает prompt два значения и сохраняет их как свойства объекта
        this.operand1 = +prompt('Введите первое число: ', '');
        this.operand2 = +prompt('Введите второе число: ', '');
    };
    this.sum = function() { // возвращает сумму этих двух значений
        this.result = this.operand1 + this.operand2;

        return this.getResult();
    };
    this.mul = function() { // возвращает произведение этих двух значений
        this.result = this.operand1 * this.operand2;

        return this.getResult();
    };
    this.div = function() { // деление
        if (this.operand2 !== 0) {
            this.result = this.operand1 / this.operand2;
        } else {
            this.result = 'Error 0';
        }

        return this.getResult();
    };
    this.sub = function() {  // вычитание
        this.result = this.operand1 - this.operand2;

        return this.getResult();
    };
    this.getResult = function (result) { // - функция, возвращающая результат операции
        return this.result;
    };
}
var calculator = new NewCalculator();

calculator.read();
console.log( calculator.sum() );
console.log( calculator.mul() );
console.log( calculator.div() );
console.log( calculator.sub() );