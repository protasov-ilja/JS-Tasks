var SPACE = ' ';
var FORBIDDEN_WORDS = ['hello', 'world'];

var message = prompt('Write your message: ', '');

function moderateMessage (message, FORBIDDEN_WORDS) {
    var Word = '';
    var target = '';
    var arrMessage = message.split(SPACE);
    var maxArrForbid = FORBIDDEN_WORDS.length;
    var maxArrMes = arrMessage.length;

    for (var i = 0; i < maxArrForbid; i++) {
        target = FORBIDDEN_WORDS[i];
        for (var a = 0; a < maxArrMes; a++) {
            Word = arrMessage[a].toLowerCase();
            if (Word === target) {
                var resultWord = '';

                for (j = 0; j < Word.length; j++) {
                    resultWord += '*';
                }
                arrMessage[a] = resultWord;
            }
        }
    }

    return arrMessage.join(SPACE);
}

var result = moderateMessage (message, FORBIDDEN_WORDS);

alert(result);