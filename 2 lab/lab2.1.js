var message = prompt('Введите сообщение: ', '');
var SEARCHING_STRING = 'чёрт побери';
var str = message.toLowerCase();

if ( str.indexOf(SEARCHING_STRING) != -1 ) {
    alert('Подскользнулся, упал. Очнулся - гипс');
} else {
    alert('Я вас не понимаю');
}