var width = 246;
var height = 268;
var offsetX = 120;
var offsetY = 0;
var pointArray = new Array(width);
var scaleX = 2.0;
var scaleY = 2.5;
var time = 8;
var debug = false;

for(var i = 0; i < width; i++) {
  pointArray[i] = new Array(height);
}

function getPoint(x, y) { // x:y 246:268
  var lonDiff = 27 - 3;
  var latDiff = 70 - 55;

  var xCount = lonDiff / width;
  var yCount = latDiff / height;

  var longitude = 3 + xCount * x;
  var latitude = 55 + yCount * y;

  var getURL = "http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/1/geopoint/lat/"
   + Math.round(latitude*100) / 100 + "/lon/" + Math.round(longitude*100) / 100 + "/data.json";

  if(!debug) {
    var temp;
    $.getJSON(getURL, function(data) {
      //writeToFile(data);
      //console.log(data);
      temp = data;
    })
    .success(function()   { pointArray[x][y] = temp; })
    .error(function()     { console.log("could not fetch longitude: " + longitude + " latitude: " + latitude)
      pointArray[x][y] = 0 })
    .complete(function()  {});
  }
  else {
    pointArray[x][y] = 1;
  }
}

function draw(time) {
  //console.log('time: ' + pointArray[101][101].timeseries[time].validTime.toString());
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.drawImage(img,-150*scale,10, img.width*scale, img.height*scale);
  //ctx.font="30px Georgia";
  //ctx.fillText(pointArray[101][101].timeseries[time].validTime.toString(), img.width*scale/2 - 250, img.height*scale + 40);

   for(var x = 0; x < 246; x++){
    for(var y = 0; y < 268; y++){
      if(pointArray[x][y] != 0) {
        if(!debug) {
          var temp = pointArray[x][y].timeseries[time].t * 100 / 100;
          //var hexTemp = (temp * 10).toString(16);
          //var hex = "#00" + (hexTemp.length == 1 ? ) + "ff";
          if(temp > 5)
            ctx.fillStyle = 'rgb(0, ' + temp * 10 + ', 255)';
          else
            ctx.fillStyle = 'rgb(255, 0, 0)';
        }
        else {
          temp = 10;
          ctx.fillStyle = 'rgb(255, 0, 0)';
        }

        //console.log('x: ' + x + ' y: ' + y + ' temperature time 0: ' + temp);

        ctx.fillRect(scaleX * (offsetX + x * 2), scaleY * (offsetY + 268 * 2 - (y * 2)), 2, 2);
        //ctx.font="12px Georgia";
        //ctx.fillText(temp.toString(), scaleX * (offsetX + x * 2 - 2), scaleY * (offsetY + 268 * 2 - (y * 2 - 2)));
      }
    }
  }
  ctx.fill();
}

function keyDownListener(e) {
  e.preventDefault();
  var keyPress = e.keyCode;
  switch(keyPress) {
      case 37: // left
        time--;
        draw(time);
        break;
      case 39: // right
        time++;
        draw(time);
        break;
  }
};

function init() {
  c = document.getElementById("myCanvas");
  ctx = c.getContext("2d");

  img = document.getElementById("norden");
  scale = 3.2;
  ctx.drawImage(img,-150*scale,10, img.width*scale, img.height*scale);

  for(var x = 0; x < width; x++) {
    for(var y = 0; y < height; y++) {
      pointArray[x][y] = 0;
    }
  }

  document.onkeydown = keyDownListener;

  width = 246;
  height = 268;
  var count = 0;

  for(var x = 0; x < width; x += 40) {
    for(var y = 0; y < height; y += 40) {
      //console.log('asdf');
      if(x >= 100 && x <= 160 && y >= 100 && y <= 160) {
        getPoint(x, y);
      }
      count++;
    }
  }
  console.log('amount of points: ' + count);


  //alert(!{SMHIData});
  //console.log(points);
}