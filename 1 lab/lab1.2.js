var ADMIN = 'Админ';
var PASSWORD = 'Чёрный Властелин';
var Login, Password;

  Login = prompt('Введите логин', undefined);
  if (Login == ADMIN) {
    Password = prompt('Введите пароль', undefined);
    if (Password == PASSWORD) {
        alert('Добро пожаловать!');
    } else if (Password != null){
        alert('Пароль неверен');
    } else {
        alert('Вход отменен');
    }
  } else if (Login == null){
    alert('Вход отменён');
  } else {
    alert('Я вас не знаю');
  }