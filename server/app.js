var fs = require("fs");
var express = require('express');
var app = express();
var router = express.Router();
var path = require("path");

//app.set('views', __dirname + '/views');
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');

var getSMHIData = false;

var localJsonFile = './my.json';


//------------READ JSON-----------//

function readJson(fileName){
	var jsonObj = require(fileName);
	return jsonObj;
}

var jsonData = require(localJsonFile);//readJson(localJsonFile);
//var obj = JSON.parse(fs.readFileSync(localJsonFile, 'utf8'));

/*var obj;
fs.readFile(localJsonFile, 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});*/

var request = require("request");

var responses = [];
var completed = 0;

var wstream = fs.createWriteStream('./my.json');

app.use(express.static(path.join(__dirname, 'views')));

app.get('/jade', function(req, res){
    res.render('test.jade', { 
    	data: jsonData
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

function requestPoint(url) {
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
		//console.log(JSON.stringify(body, null, 4));
		if(!error && response.statusCode === 200) {
			wstream.write(JSON.stringify(body, null, 8) + ',\n');
		}
	    else console.log('ERR: ' + error + ' ' + body + ' ' + url);
	})
}

xStart = 30; // 4
xEnd = 34;//230; // 244
yStart = 5; // 10
yEnd = 7;//255; // 250

if(getSMHIData) {
	var jsoninit = '{\n' + '\t"SMHIPoints": [\n\t';
	wstream.write(jsoninit);

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
	//wstream.write('\t]\n}');
}

