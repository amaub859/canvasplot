var fs = require("fs");
var express = require('express');
var app = express();
var router = express.Router();
//var path = require("path");

//app.set('views', __dirname + '/views');
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');

var getSMHIData = true;

var localJsonFile = '../smhi_data_30_230_5_255.json';


//------------READ JSON-----------//

function readJson(fileName){
	var jsonObj = require(fileName);
	return jsonObj;
}

//var jsonData = readJson(localJsonFile);

var request = require("request");

var responses = [];
var completed = 0;

var wstream = fs.createWriteStream('./my.json');

//app.use(express.static(path.join(__dirname, 'views')));
/*
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
	//res.send(JSON.stringify(jsonData));
	//res.render('index.html', { SMHIData: 'test' });
	//res.sendFile('my.json');
});
app.listen(8080);
*/
function requestPoint(url) {
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
		//console.log(JSON.stringify(body, null, 4));
		if(!error && response.statusCode === 200) {
			wstream.write(JSON.stringify(body, null, 4) + '\n');
		}
	    else console.log('ERR: ' + error + ' ' + body + ' ' + url);
	})
}

xStart = 30; // 4
xEnd = 230; // 244
yStart = 5; // 10
yEnd = 255; // 250

if(getSMHIData) {
	for(var x = xStart; x < xEnd; x += 2){ // 244
	    for(var y = yStart; y < yEnd; y += 2){ // 250
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

