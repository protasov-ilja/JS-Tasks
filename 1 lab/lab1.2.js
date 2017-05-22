var ADMIN = 'Админ';
var PASSWORD = 'Чёрный Властелин';
var login, password;

login = prompt('Введите логин', undefined);
if (login === ADMIN) {
    password = prompt('Введите пароль', undefined);
    if (password === PASSWORD) {
        alert('Добро пожаловать!');
    } else if (password != null) {
        alert('Пароль неверен');
    } else {
        alert('Вход отменен');
    }
} else if (login === null) {
    alert('Вход отменён');
} else {
    alert('Я вас не знаю');
}