var forbiddenWord = ['привет', 'пока'];
var message = prompt('Введите сообщение: ', '');
var position = 0;
var recorectMessage = '';

message = message.toLowerCase();
for (var i = 0; i <= max; i++) {
    var target = forbiddenWord[i];
    message.indexOf(target, position);
    while (position != -1) {
        recorectMessage = message.substr(position, target.length)
    }
}
message.toUpperCase();

