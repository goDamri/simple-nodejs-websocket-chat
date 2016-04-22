var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
// menampilkan file index.html
res.sendFile(__dirname + '/chet.html');
});

io.on('connection', function(socket){
	// jika ada koneksi baru
	console.log('seseorang telah bergabung');
	io.emit('ngobrol', {'msg': "Server" + ' : Seseorang telah bergabung di obrolan ' , 'bgc' : "rgb(244,244,244)" });

	socket.on('ngobrol', function(msg){

	//	io.emit('ngobrol', { for: 'everyone' });
		var sender = msg.sender;
		var message = msg.message;
		var responsemsg = {'msg': sender + ' : ' + message, 'bgc' : msg.bgc };
		io.emit('ngobrol', responsemsg);
		console.log(msg.sender +" mengatakan "+ msg.message);
	});
});

http.listen(7660, function(){
console.log('listening on *:7660');
});
