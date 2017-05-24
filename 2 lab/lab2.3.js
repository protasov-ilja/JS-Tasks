var uncleFedor = 
{
    adult: false,
    age: 15,
    name: 'Федор',
    dog: {
        name: 'Шарик',
        age: 6,
        profession: 'Фотоохота'
    }
};
var cat = 
{
    name: 'Матроскин',
    age: 6,
    profession: 'Кот'
};

uncleFedor.cat = cat;
console.log(uncleFedor);
cat.name = 'Барсик';
console.log(uncleFedor);
