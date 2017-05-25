var uncleFedor = 
{
    adult: false,
    age: 15,
    name: 'Федор',
    dog: {
        name: 'Шарик',
        age: 6,
        profession: 'Фотограф'
    }
};
var Cat =
{
    name: 'Матроскин',
    age: 6,
    profession: 'Кот'
};

uncleFedor.cat = Cat;
console.log(uncleFedor);
Cat.name = 'Барсик';
console.log(uncleFedor);
