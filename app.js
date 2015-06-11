
var fs = require("fs");

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
var http = require('http');
var responses = [];
var completed = 0;

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

