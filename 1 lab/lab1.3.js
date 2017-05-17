//Через FOR
var MaxNumber = 10;

  for (var Counter = 2; Counter <= MaxNumber; Counter++) {
    if (Counter % 2 == 0) {
        console.log(Counter);
    }
  }

//Через WHILE
var MaxNumber = 10, Counter = 2;

  while (Counter <= MaxNumber) {
    if (Counter % 2 == 0) {
        console.log(Counter);
    }
    Counter++;
  }