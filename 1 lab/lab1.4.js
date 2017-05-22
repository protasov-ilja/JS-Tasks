var firstNumber, lastNumber;

function isPrime(number) {
    var notPrime = true;
    if (number >= 2) {
        for (var counter = 2; (counter * counter <= number) && (notPrime); counter++) {
            if (number % counter === 0) {
                notPrime = false;
            }
        }
    }
    return notPrime;
}

firstNumber = +prompt("Введите начало интервала", '');
lastNumber = +prompt("Введите конец интервала", '');
for (var number = firstNumber; number <= lastNumber; number++) {
    if (isPrime(number)) {
        console.log(number);
    }
}