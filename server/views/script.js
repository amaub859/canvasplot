var width = 246;
var height = 268;
var offsetX = 120;
var offsetY = 0;
var pointArray = new Array(width);
var scaleX = 2.0/3;
var scaleY = 2.5/3;
var time = 8;
var parameter = "t";
var alpha = 0.6;
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

function drawPoints(time) 
{
  //console.log('time: ' + pointArray[101][101].timeseries[time].validTime.toString());
  //ctx.clear();
  //ctx.beginPath();
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.drawImage(img,-150*scale,10, img.width*scale, img.height*scale);

  //ctx.font="30px Georgia";
  //ctx.fillText(pointArray[101][101].timeseries[time].validTime.toString(), img.width*scale/2 - 250, 			img.height*scale + 40);
  //246 268
   for(var x = 0; x < 246; x++){
    for(var y = 0; y < 268; y++){
      var color;

      if(pointArray[x][y] != 0) 
      {
          if(!debug) 
          {
	          xValue = scaleX * (offsetX + x * 2);
	          yValue = scaleY * (offsetY + 268 * 2 - (y * 2));
			  
			     if(parameter == "t")
			     {  
	          	  var temp = pointArray[x][y].timeseries[time].t * 100 / 100;
	          	  //console.log(temp);
		          if(temp <= 0)
		            color = '72, 249 , 231';
		          else if(temp > 0 && temp <= 5)
		            color = '41, 105, 233';
		          else if(temp > 5 && temp <= 10)
		            color = '3, 36, 102';
		          else if(temp > 10 && temp <= 15)
		            color = '135, 13, 165';
		          else if(temp > 15 && temp <= 20)
		            color = '229, 11, 98';
		          else if(temp > 20) 
		            color = '255,0,0';
		          else
		          	color = '0,0,0';

              circle(xValue, yValue, 15, color, alpha);
	          }
	          
	          else if(parameter == "tcc_mean")
	          {
	          	color = '0,0,0';
		        var temp = pointArray[x][y].timeseries[time].tcc_mean;
		          //console.log(temp);
		          if(temp == 1)
		            alpha = 0.1;
		          else if(temp == 2)
		            alpha = 0.2;
		          else if(temp == 3)
		            alpha = 0.3;
		          else if(temp == 4)
		            alpha = 0.4;
		          else if(temp == 5)
		            alpha = 0.5;
		          else if(temp == 6)
		            alpha = 0.6;
		          else if(temp == 7)
		            alpha = 0.7;
		          else
		            alpha = 0.8;

              circle(xValue, yValue, 15, color, alpha);
	          }

            else if(parameter == "wd")
            {
            var temp = pointArray[x][y].timeseries[time].wd;
            var temp2 = pointArray[x][y].timeseries[time].ws;
              //console.log(temp2);
              if(temp2 <= 0.2) //Lugnt
                color = 'rgb(241, 241 , 241)';
              else if(temp2 > 0.2 && temp2 <= 1.5) //Svag vind
                color = 'rgb(241, 198 , 205)';
              else if(temp2 > 1.5 && temp2 <= 3.3) //Svag vind
                color = 'rgb(230, 165 , 173)';
              else if(temp2 > 3.3 && temp2 <= 5.4) //Måttlig vind
                color = 'rgb(217, 129 , 141)';
              else if(temp2 > 5.4 && temp2 <= 7.9) //Måttlig vind
                color = 'rgb(203, 95 , 111)';
              else if(temp2 > 7.9 && temp2 <= 10.7) //Frisk vind
                color = 'rgb(172, 84 , 96)';
              else if(temp2 > 10.7 && temp2 <= 13.8) //Frisk vind
                color = 'rgb(140, 72 , 83)';
              else if(temp2 > 13.8 && temp2 <= 17.1) //Hård vind
                color = 'rgb(110, 63 , 71)';
              else if(temp2 > 17.1 && temp2 <= 20.7) //Hård vind
                color = 'rgb(78, 53 , 57)';
              else if(temp2 > 20.7 && temp2 <= 24.4) //Hård vind
                color = 'rgb(241, 241 , 241)';
              else if(temp2 > 24.4 && temp2 <= 28.4) //Storm
                color = 'rgb(241, 241 , 241)';
              else if(temp2 > 28.4 && temp2 <= 32.6) //Storm
                color = 'rgb(241, 241 , 241)';
              else if(temp2 > 32.6) //Orkan
                color = 'rgb(241, 241 , 241)';
              else
                color = 'rgb(0, 0 , 0)';

              drawArrowAtAngle(xValue,yValue,temp2,toRadians(temp),color);
            }
	          //var hexTemp = (temp * 10).toString(16);
	          //var hex = "#00" + (hexTemp.length == 1 ? ) + "ff";
	
	            // var grd = ctx.createRadialGradient(xValue + 5, yValue + 5, 1, xValue + 5, yValue + 5, 5);
	            // grd.addColorStop(0, "red");
	            // grd.addColorStop(1, "white");
	
	            // ctx.fillStyle = grd;
		  }
		  else 
		  {
          	temp = 10;
		  	ctx.fillStyle = 'rgb(255, 0, 0)';
		  }

        //console.log('x: ' + x + ' y: ' + y + ' temperature time 0: ' + temp);a

        //circle(xValue, yValue, 15, color, alpha);
        //console.log(xValue,yValue);
        //canvas_arrow(xValue,yValue,xValue + 10,yValue + 10, toRadians(-45));
        
        //ctx.fillRect(xValue, yValue, 10, 10);

        //ctx.font="12px Georgia";
        //ctx.fillText(temp.toString(), scaleX * (offsetX + x * 2 - 2), scaleY * (offsetY + 268 * 2 - (y * 2 - 2)));
      }
    }
  }
  //ctx.fill();
}

function toRadians(degrees){
    radians = degrees * (Math.PI/180);
    return radians;
}

function circle(x, y, r, c, a) {
    ctx.beginPath();
    var rad = ctx.createRadialGradient(x, y, 1, x, y, r);
    rad.addColorStop(0, 'rgba('+c+','+a+')');
    rad.addColorStop(1, 'rgba('+c+',0)');
    ctx.fillStyle = rad;
    ctx.arc(x, y, r, 0, Math.PI*2, false);
    ctx.fill();
}

function drawArrowAtAngle(cx,cy,lenght,angle,color)
{
    ctx.save();
    ctx.translate(cx,cy) ;
    ctx.rotate(angle) ;
    ctx.translate(-cx,-cy) ;  
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#aaa';
    ctx.moveTo(cx+lenght,cy-2);
    ctx.lineTo(cx-lenght,cy-2);
    ctx.lineTo(cx-(lenght + 5),cy);
    ctx.lineTo(cx-lenght,cy+2);
    ctx.lineTo(cx+lenght,cy+2);
    ctx.lineTo(cx+lenght,cy-2);  
    ctx.stroke();
    ctx.closePath();
    ctx.restore();  
    ctx.fillStyle = color;
    ctx.fill();
}

    function drawCircle(canvasContext, circle, text) {
        canvasContext.beginPath(); //começa ou reinicia o desenho de algo       
        canvasContext.fillStyle = "rgb(43,166,203)";
        canvasContext.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI, false); //cria arcos     
        canvasContext.fill(); //atribui estilos

        drawText(canvasContext, circle, text);
    }

    function drawText(canvasContext, circle, text) {
        canvasContext.font = '8pt Calibri';
        canvasContext.fillStyle = 'white';
        canvasContext.textAlign = 'center';
        canvasContext.fillText(text, circle.x, circle.y + 3);
    }

    function drawLine(canvasContext) {
        canvasContext.moveTo(50, 50);
        canvasContext.lineTo(100, 100);
        canvasContext.stroke();
    }


function keyDownListener(e) {
  e.preventDefault();
  var keyPress = e.keyCode;
  switch(keyPress) {
      case 37: // left
        time--;
        drawPoints(time);
        break;
      case 39: // right
        time++;
        drawPoints(time);
        break;
      case 81: // right
        alpha -= 0.1;
        drawPoints(time);
        break;
      case 87: // right
        alpha += 0.1;
        drawPoints(time);
        break;
      case 49: // right
        parameter = 't';
        drawPoints(time);
        break;
      case 50: // right
        parameter = 'tcc_mean';
        drawPoints(time);
        break;
      case 51: // right
        parameter = 'wd';
        drawPoints(time);
        break;
  }
};

function init() {
  c = document.getElementById("myCanvas");
  ctx = c.getContext("2d");

  img = document.getElementById("norden");
  scale = 1.2;
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

  for(var x = 0; x < width; x += 10) {
    for(var y = 0; y < height; y += 10) {
      //console.log('asdf');
      //if(x >= 100 && x <= 160 && y >= 100 && y <= 160) {
        getPoint(x, y);
      //}
      count++;
    }
  }
  console.log('amount of points: ' + count);

  //var data = !{SMHIData};
  //success: function(SMHIData) {
  //    console.log(SMHIData);
  //}
  //console.log(!{data});
}