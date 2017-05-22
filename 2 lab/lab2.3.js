var ДядяФедор = {
  bool: '',
  int: '',
  string: '',
  пес: {
    name: 'Шарик',
    profession: 'Охотник'
  }
};

var Кот = {
  name: 'Матроскин',
  profession: 'Кот'
};

for (var prop in ДядяФедор) {
  alert(prop, ДядяФедор[prop]);
}

ДядяФедор.Кот = 'Матроскин';
Кот.name = 'Борис';
for (var prop in ДядяФедор) {
  alert(prop, ДядяФедор[prop]);
}
