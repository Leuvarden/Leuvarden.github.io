///task - https://gist.github.com/humanamburu/c4be6035b08bf9d0663e4bd9e80c5daa


let ws = new WebSocket('ws://188.226.146.213/');
ws.binaryType = 'arraybuffer';

var data = {
    "name": "HelloWorld",
    "command": "challenge accepted"
};

ws.onopen = function() {
    ws.send(JSON.stringify(data));
}
ws.onmessage = function(e) {
    console.log('дата' + e.data);
}

///answer - VM424:10 дата{"message":"You successfully accept challenge","next":"arithmetic","token":"4fa97a30beddbb70"}

let secondTask = {
    "token": "4fa97a30beddbb70",
    "command": "arithmetic"
}
ws.send(JSON.stringify(secondTask))

//answer - VM424:10 дата{"name":"arithmetic","task":{"sign":"+","values":[147,86,223,181]}}
var answer = 147 + 86 + 223 + 181;
let data2 = {
    "token": "4fa97a30beddbb70",
    "command": "arithmetic",
    "answer": answer
};
ws.send(JSON.stringify(data2));

//answer - VM424:10 дата{"message":"You solve task","next":"binary_arithmetic"}
let data3 = {
    "token": "4fa97a30beddbb70",
    "command": "binary_arithmetic"
};
ws.send(JSON.stringify(data3));

//answer - VM424:10 дата{"name":"binary_arithmetic","task":{"bits":16}}
//VM424:10 дата[object ArrayBuffer]

var temp;
ws.onmessage = function(e) {
    console.log('дата ' + e.data);
    if (typeof e.data === 'object') temp = e.data;
}

ws.send(JSON.stringify(data3))

//VM922:2 дата {"name":"binary_arithmetic","task":{"bits":16}}
//VM922:2 дата [object ArrayBuffer]

var arr16 = new Uint16Array(temp)

//arr16
//Uint16Array(8) [57988, 47475, 16667, 18702, 18257, 4396, 38463, 56617]
var total = arr16.reduce(function(a, b) {
    return a + b;
});

//total
//258565
let data4 = {
    token: "4fa97a30beddbb70",
    "command": "binary_arithmetic",
    "answer": total
};
ws.send(JSON.stringify(data4))

//VM922:2 дата {"message":"You solve task","next":"win"}
let data5 = {
    token: "4fa97a30beddbb70",
    "command": "win"
};
ws.send(JSON.stringify(data5))
//VM922:2 дата {"secretCode":"883fb920333fae6d"}
