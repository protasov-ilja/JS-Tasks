var message = prompt('Введите сообщение: ', '');
var SERCHINGSTRING = 'Чёрт побери';

if ( message.indexOf(SERCHINGSTRING) != -1 ) {
    alert('Подскользнулся, упал. Очнулся - гипс');
} else {
    alert('Я вас не понимаю');
}