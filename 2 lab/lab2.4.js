var vasya = {name: "Вася", age: 23};
var masha = {name: "Маша", age: 18};
var vovochka = {name: "Вовочка", age: 6};
var people = [masha, vasya, masha, vovochka];

function compareAge(FirstPerson, SecondPerson) 
{
    return (FirstPerson.age - SecondPerson.age);
}

people.sort(compareAge);
console.log(people);