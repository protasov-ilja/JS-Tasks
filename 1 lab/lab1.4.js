var FirstNumber, LastNumber;

function isPrime(Number) {
    var NotPrime = true;
    for (var Counter = 2; (Counter * Counter <= Number) && (NotPrime); Counter++) {
        if (Number % Counter == 0) {
            NotPrime = false;
        }
    }
    return NotPrime;
}

  FirstNumber = prompt("Введите начало интервала", '');
  FirstNumber = +FirstNumber;
  LastNumber = prompt("Введите конец интервала", '');
  LastNumber = +LastNumber;
  if (FirstNumber < 2) {
      alert('Неверный интервал');
  } else {
      for (var Number = FirstNumber; Number <= LastNumber; Number++) {
          if (isPrime(Number)) {
              console.log(Number);
          }
      }
  }