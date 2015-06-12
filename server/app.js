var fs = require("fs");
var http = require('http');
var express = require('express');
var app = express();
var router = express.Router();
var path = require("path");
//app.use(express.static(__dirname + '../client/'));
app.use(express.static(path.join(__dirname, '')));
app.set('views', __dirname);

var getSMHIData = false;

var myData = {
  name:'test',
  version:'1.0'
}

var outputFilename = 'my.json';
var wstream = fs.createWriteStream(outputFilename);

var request = require("request");

/*
$.getJSON(url, function(data) {
    console.log(data);
    //temp = data;
  });
*/
var responses = [];
var completed = 0;


app.get('/', function(req, res) {
	res.send('hello world');
	//res.render('index.html', { SMHIData: 'test' });
	//res.sendFile('my.json');
});
app.get('/json', function(req, res) {
	res.send(JSON.stringify('/Users/christoferarleryd/Programming/canvasplot/canvasplot/server/my.json'));
	//res.render('index.html', { SMHIData: 'test' });
	//res.sendFile('my.json');
});

app.post('/', function (req, res) {
  res.send('Got a POST request');
});

app.listen(8080);

/*fs.readFile('../client/index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8080);
});*/

// Create the server. Function passed as parameter is called on every request made.
// request variable holds all request parameters
// response variable allows you to do anything with response sent to the client.
/*http.createServer(function (request, response) {
	// Write headers to the response.
	// 200 is HTTP status code (this one means success)
	// Second parameter holds header fields in object
	// We are sending plain text, so Content-Type should be text/plain
	response.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	// Send data and end response.
	response.end('Hello HTTP!');
// Listen on the 8080 port.
}).listen(8080);
*/
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



//wstream.end();
/*
		wstream.write(JSON.stringify(myData, null, 4), function(err) {
		    if(err) {
		      console.log(err);
		    } else {
		      console.log("JSON saved to " + outputFilename);
		    }
		});  
		
		wstream.end();
*/

/*
       fs.appendFile(outputFilename, JSON.stringify(myData, null, 4), function(err) {
		    if(err) {
		      console.log(err);
		    } else {
		      console.log("JSON saved to " + outputFilename);
		    }
		}); 
*/

