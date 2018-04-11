var p_flag = 0;
var p_speed = 0.1;
var slideController;
var flag=0;
var sensorLocation = 
[
  [62,21], [66,35], [76,41], [88,45], [103,43], [102,22], [89,3], [74,7], [119,42]
];

var factoryLocation = 
[
  [89,27,'Roadrunner Fitness Electronics'], [90,21,'Kasios Office Furniture'], [109,26,'Radiance ColourTek'], [120,22,'Indigo Sol Boards']
];


var sensorMatrix = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
];



function preload() {
    
    meteorologicalData = loadTable("data/MeteorologicalData.csv", 'csv', 'header');
    sensorData = loadTable("data/SensorData.csv", 'csv', 'header');
   
}



function setup() {
 
  createCanvas(1400,770);  
  
  slideController = createSlider(0, 705, 0, 0.1);
  slideController.position(200, 725);
  slideController.style('width', '1000px');
  
  playButton = createButton(' > ');
  playButton.position(120, 725);
  playButton.mousePressed(playVizualization)
  
  pauseButton = createButton(' || ');
  pauseButton.position(160, 725);
  pauseButton.mousePressed(pauseVizualization);
  
  slowerButton = createButton('<<');
  slowerButton.position(1220, 725);
  slowerButton.mousePressed(slowVizualization);
  
  fasterButton = createButton('>>');
  fasterButton.position(1270, 725);
  fasterButton.mousePressed(fastVizualization);

  for(var i=0;i<factoryLocation.length;i++)
  {
     factoryLocation[i][0] = map(factoryLocation[i][0],40,130,0,1400);
     factoryLocation[i][1] = map(factoryLocation[i][1],-10,55,0,770);
  }
  
 for(var i=0;i<sensorLocation.length;i++)
 {
     sensorLocation[i][0] = map(sensorLocation[i][0],40,130,0,1400);
     sensorLocation[i][1] = map(sensorLocation[i][1],-10,55,0,770);
  }

}


function playVizualization() {
  p_flag=1;
}

function pauseVizualization() {
  p_flag=0;
}

function slowVizualization() {
  p_speed=(Math.round(p_speed*10)/10)-0.1;
}

function fastVizualization() {
  p_speed=(Math.round(p_speed*10)/10)+0.1;
}

function draw() {

  background(41);
  renderSensor();
  renderFactory(factoryLocation);
   var token = slideController.value();
   var date = Date.parse(meteorologicalData.getString(round(token),0))
   var timestamp=meteorologicalData.getString(round(token),0)
   var wSpeed = meteorologicalData.getString(round(token),2);
   var ib=select('#ibut13');
   
    for(var token2=0;token2<sensorData.getRowCount();token2++){
        if(Date.parse(sensorData.getString(token2,2))==date){
          if(sensorData.getString(token2,0)=='AGOC-3A')
            sensorMatrix[sensorData.getString(token2,1)-1][0]=sensorData.getString(token2,3);
          else if(sensorData.getString(token2,0)=='Appluimonia')
            sensorMatrix[sensorData.getString(token2,1)-1][1]=sensorData.getString(token2,3);
          else if(sensorData.getString(token2,0)=='Chlorodinine')
            sensorMatrix[sensorData.getString(token2,1)-1][2]=sensorData.getString(token2,3);
          else if(sensorData.getString(token2,0)=='Methylosmolene')
            sensorMatrix[sensorData.getString(token2,1)-1][3]=sensorData.getString(token2,3);
          else
            console.log("error inside slider function ");
        }
    }
  renderGas(token);
  renderCompass(token);
  renderWindLines(token);



  if(p_flag ==1 &&token+p_speed>=0 && token+p_speed<=705)
  {
       
         token=token+p_speed;
  }
  token=Math.round(token*10)/10;
  var x=Math.round(p_speed*10)/10
  push();
  fill(255);
  text("Speed: "+ (x*10) +"x " , 1320, 725, 200, 20);
  slideController.value(token)
  text("Timestamp: "+ timestamp, 700 , 748, 200, 20);
  text("Speed of Wind: "+ wSpeed + " m/sec", 70 , 15, 200, 20);
  pop();
  ib.position(-20,40);
  renderLegend();
 
}