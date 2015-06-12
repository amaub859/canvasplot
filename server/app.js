var fs = require("fs");
//var http = require('http');
var express = require('express');
var app = express();
var router = express.Router();
var path = require("path");
//var server = require('http').createServer(app);
//var io = require('socket.io')(server);
//app.use(express.static(__dirname + '../client/'));
//app.use(express.static(path.join(__dirname, '')));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var getSMHIData = false;

var localJsonFile = './my.json';


//------------READ JSON-----------//

function readJson(fileName){
	var jsonObj = require(fileName);
	return jsonObj;
}

var jsonData = readJson(localJsonFile);

var request = require("request");

var responses = [];
var completed = 0;

//app.use(express.logger());
//app.set("view options", {layout: false});
app.use(express.static(path.join(__dirname, 'views')));
//app.use(express.static(__dirname + '../client'));

app.get('/jade', function(req, res){
    res.render('test.jade', { 
    	data: 3
    });
});

app.set('view engine', 'html');
app.get('/html', function(req, res){
    res.render('index', { 
    	data: 4
    });
});

//app.get('/', function(req, res) {
//	res.send('hello world');
	//res.render('index.html', { SMHIData: 'test' });
	//res.sendFile('my.json');
//});
app.get('/json', function(req, res) {
	res.send(JSON.stringify(jsonData));
	//res.render('index.html', { SMHIData: 'test' });
	//res.sendFile('my.json');
});
app.listen(8080);

function requestPoint(url) {
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
		if(!error && response.statusCode === 200) {
			wstream.write(JSON.stringify(body, null, 4) + '\n');
		}
		else if(response.statusCode == 503) {
			console.log(body.request.uri.href);
			//requestPoint(url)
		}
	    else console.log(body);
	})
}

xStart = 30; // 4
xEnd = 230; // 244
yStart = 5; // 10
yEnd = 255; // 250

if(getSMHIData) {
	for(var x = xStart; x < xEnd; x++){ // 244
	    for(var y = yStart; y < yEnd; y++){ // 250
	    	//if((x == xStart || x == xEnd-1) || (y == yStart || y == yEnd-1)) {
	    		//console.log("coords: " + x + ', ' + y);
		    	var latitude = 70.5 - y * (18/268);
		    	var longitude = 14.5 + (x * (45 / 246) - 22.5) / (45 / (45 - (y / 268) * 20));
		    	latitude = latitude.toFixed(4);
		    	longitude = longitude.toFixed(4);
		    
				var url = "http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/1/geopoint/lat/"
							+ latitude.toString() + "/lon/" + longitude.toString() + "/data.json";
				//console.log(url);
				
				requestPoint(url);
			//}
		}
	}
}

