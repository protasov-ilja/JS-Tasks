//Через FOR
var MAXNUMBER = 10;

for (var counter = 2; counter <= MAXNUMBER; counter++) {
  if (counter % 2 === 0) {
        console.log(counter);
  }
}

//Через WHILE
counter = 2;

while (counter <= MAXNUMBER) {
  if (counter % 2 === 0) {
    console.log(counter);
  }
  counter++;
}