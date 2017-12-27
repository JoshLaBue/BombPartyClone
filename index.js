var http = require('http');

var express = require('express');
var app = express();
var hbs = require('hbs');
var server = http.Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

var text = require('./text.js');

app.set('view engine', 'hbs');
app.use(express.static('public'));
var loadCount = 0;
app.get('/', (req, res) => {
    loadCount++;
    text.genLetters(2);
    res.render('index.hbs', {
        index: loadCount,
        letters: text.genLetters(2)
    });
    console.log(loadCount);
});


io.on('connection', (socket) => {
   console.log('User ' + loadCount + ' connected');

   socket.on('ping', (value) => {
    console.log(value);
   });
   socket.on('disconnect', () => {
    console.log('user disconnected');
   });
   socket.on('word', (word) => {
       console.log(word);
        var test = text.checkWord(word);
        console.log(test);
        if(test == true) {
            socket.emit('wordResult', true);
            socket.emit('newWord', text.genLetters(2));
        }
        else if(test == false) {
            socket.emit('wordResult', false);
        }
   });
});

server.listen(port, () => {
    console.log('Listening on port ' + port);
});