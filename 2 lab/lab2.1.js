var message = prompt('Введите сообщение: ', '');
var SERCHINGSTRING = 'чёрт побери';
var str = message.toLowerCase();

if ( str.indexOf(SERCHINGSTRING) != -1 ) {
    alert('Подскользнулся, упал. Очнулся - гипс');
} else {
    alert('Я вас не понимаю');
}