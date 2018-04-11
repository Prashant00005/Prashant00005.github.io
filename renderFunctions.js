function setFlag(index){
  console.log(index);
  var num=index.substring(4);
  console.log(num);
  flag=num-4;
}
function renderSensor(){
   push();
   fill(0,0,255);
    var ib1=select('#ibut4');
    var ib2=select('#ibut5');
    var ib3=select('#ibut6');
    var ib4=select('#ibut7');
    var ib5=select('#ibut8');
    var ib6=select('#ibut9');
    var ib7=select('#ibut10');
    var ib8=select('#ibut11');
    var ib9=select('#ibut12');
   
   for(var i=0;i<sensorLocation.length;i++){
       
       ib1.position(sensorLocation[0][0]+5,height-sensorLocation[0][1]);
       ib2.position(sensorLocation[1][0]+5,height-sensorLocation[1][1]);
       ib3.position(sensorLocation[2][0]+5,height-sensorLocation[2][1]);
       ib4.position(sensorLocation[3][0]+5,height-sensorLocation[3][1]);
       ib5.position(sensorLocation[4][0]+5,height-sensorLocation[4][1]);
       ib6.position(sensorLocation[5][0]+5,height-sensorLocation[5][1]);
       ib7.position(sensorLocation[6][0]+5,height-sensorLocation[6][1]);
       ib8.position(sensorLocation[7][0]+5,height-sensorLocation[7][1]);
       ib9.position(sensorLocation[8][0]+5,height-sensorLocation[8][1]);

       push();
       fill(255,255,255)
       text(i+1,sensorLocation[i][0],height-sensorLocation[i][1]+30);
       pop();
   }
   pop();
}


function renderFactory(factoryLocation){
  push();
  var ib=select('#ibut');
  var ib1=select('#ibut1');
  var ib2=select('#ibut2');
  var ib3=select('#ibut3');

   for(var i=0;i<factoryLocation.length;i++){
     fill(213,76,124);  
     ib.position(factoryLocation[0][0],height-factoryLocation[0][1]-10);
     text("Roadrunner Fitness Electronics",factoryLocation[0][0],height-factoryLocation[0][1]-20);
     ib1.position(factoryLocation[1][0],height-factoryLocation[1][1]-10);
     text("Kasios Office Furniture",factoryLocation[1][0]-105,height-factoryLocation[1][1]+10);
     ib2.position(factoryLocation[2][0],height-factoryLocation[2][1]-10);
     text("Radiance ColourTek",factoryLocation[2][0],height-factoryLocation[2][1]-20);
     ib3.position(factoryLocation[3][0],height-factoryLocation[3][1]-10);
     text("Indigo Sol Boards",factoryLocation[3][0],height-factoryLocation[3][1]-20);
     
   }
  pop();
  
}

function renderGas(){
 var a=[
 [0,0,0,0],
 [0,0,0,0],
 [0,0,0,0],
 [0,0,0,0],
 [0,0,0,0],
 [0,0,0,0],
 [0,0,0,0],
 [0,0,0,0],
 [0,0,0,0]]
 ;
  for(var num =0;num<sensorLocation.length;num++){
      var circleRad =  10;
      var circleMargin = 10;
       for(var i=0; i<sensorMatrix[num].length; i++) {
            if(i==0){
              var scaledLevel = map(sensorMatrix[num][i],0,102,0,-500);
            }else if(i==1){
              var scaledLevel = map(sensorMatrix[num][i],0,11,0,-500);
            }else if(i ==2){
              var scaledLevel = map(sensorMatrix[num][i],0,16,0,-500);
            }
            else{
              var scaledLevel = map(sensorMatrix[num][i],0,101,0,-500);
            }
            
            push();
            noStroke();
            textSize(9);
            if(i==0)
            {
              fill(246, 17, 237, 200);
               ellipse(sensorLocation[num][0]+30, height-sensorLocation[num][1]-25,scaledLevel+5,scaledLevel+5);
               
               
            }
            else if(i==1)
            { 
              fill(70, 100, 250, 200);
               ellipse(sensorLocation[num][0]+80, height-sensorLocation[num][1]+20,scaledLevel+5,scaledLevel+5);
              
            }
            else if(i==2)
             {
              fill(251, 155, 7, 200);
               ellipse(sensorLocation[num][0]+28, height-sensorLocation[num][1]+80,scaledLevel+5,scaledLevel+5);
              
             }           
            else if(i==3)
              {
              fill(255, 170, 170, 200);
               ellipse(sensorLocation[num][0]-35, height-sensorLocation[num][1]+20,scaledLevel+5,scaledLevel+5);
              } 
            a[num][i]=Math.round(sensorMatrix[num][i]*100)/100;
            fill(255,255,255);
            
            pop();
       }
     
   }
   rendertable(a);
}

function renderWindLines(token){

  var wSpeed = meteorologicalData.getString(round(token),2);
  var WDirection = meteorologicalData.getString(round(token),1);
  var wAngle = radians(Number(WDirection - 90));
  var wVector = p5.Vector.fromAngle(wAngle);
  renderVector(wVector, createVector(factoryLocation[0][0]+75,factoryLocation[0][1]-10,0),wSpeed*50);
  renderVector(wVector, createVector(factoryLocation[1][0]+45,factoryLocation[1][1]-10,0),wSpeed*50);
  renderVector(wVector, createVector(factoryLocation[2][0]+60,factoryLocation[2][1]-55,0),wSpeed*50);
  renderVector(wVector, createVector(factoryLocation[3][0]+65,factoryLocation[3][1]+40,0),wSpeed*50);

}

function renderVector(v,loc,scale){
    push();
    var arrowsize = 4;
    
    translate(loc.x,loc.y);
    stroke(140,200,80);
    noStroke();
    rotate(v.heading());

    var len = v.mag() * scale;
    push();
    fill(159, 94, 226, 80)
    
    triangle(0,0,len,scale*0.5,len,scale*-0.5)
    pop();
    push();
    fill(172,117,230,80);
    
    triangle(0,0,len,scale*0.4,len,scale*-0.4)
    pop();
    push();
    fill(186,140,234,80);
    
    triangle(0,0,len,scale*0.3,len,scale*-0.3)
    pop();
    push();
    fill(200,163,238,80);
    
    triangle(0,0,len,scale*0.2,len,scale*-0.2)
    pop();
    
    push();
    fill(213,186,242,80);
    
    triangle(0,0,len,scale*0.1,len,scale*-0.1)
    pop();
    
    pop();
}

function renderNeedle(v,loc,scale){
    push();
    var arrowsize = 4;
    
    translate(loc.x,loc.y);
    stroke(177,255,170);
    strokeWeight(3);
    rotate(v.heading());

    var len = v.mag() * scale;
    line(0,0,len+20,0);
    line(len+20,0,len-arrowsize+20,+arrowsize/2);
    line(len+20,0,len-arrowsize+20,-arrowsize/2);
    pop();
}

function renderCompass(token){
    push();
    fill(0,255,0);
    var wSpeed = meteorologicalData.getString(round(token),2);
    var WDirection = meteorologicalData.getString(round(token),1);
    var wAngle = radians(Number(WDirection - 90));
    var wVector = p5.Vector.fromAngle(wAngle);
    pop();
    renderNeedle(wVector, createVector(133,160,0),wSpeed*15);
   
}

function renderLegend(){
 push();
 fill(246, 17, 237); 
 ellipse(35,310,15,15);
 pop();
 push();
 fill(70, 100, 250);
 ellipse(35,330,15,15);
 pop();
 push();
 fill(251, 155, 7);
 ellipse(35,350,15,15);
 pop();
 push();
 fill(255, 170, 170);
 ellipse(35,370,15,15);
 pop();
 var ib9=select('#ibut14');
 var ib10=select('#ibut15');
 ib9.position(10,390);
 ib10.position(120,390);
 fill(255);
 text("AGOC-3A",75,315);
 text("Appluimonia",75,335);
 text("Chlorodinine",75,355);
 text("Methylosmolene",75,375);
 text("Sensor",75,410);
 text("Factory",170,410);
}

function rendertable(a){

 x1= 35;
 xdiff = 50;
 ydiff = 20;
 var y1 = 490;
 push();
 fill(246, 17, 237); 
 ellipse(x1+xdiff,y1-5,15,15);
 pop();
 push();
 fill(70, 100, 250);
 ellipse(x1+xdiff*2,y1-5,15,15);
 pop();
 push();
 fill(251, 155, 7);
 ellipse(x1+xdiff*3,y1-5,15,15);
 pop();
 push();
 fill(255, 170, 170);
 ellipse(x1+xdiff*4,y1-5,15,15);
 pop();
 
 for(var m=0;m<9;m++){  
   push();
   if(flag==m)
   {
     fill(255,0,0)
   }
   
 text(m+1, x1, y1+ydiff*(m+1));
 text(a[m][0], x1+xdiff-10, y1+ydiff*(m+1));
 text(a[m][1], x1+xdiff*2-10, y1+ydiff*(m+1));
 text(a[m][2], x1+xdiff*3-10, y1+ydiff*(m+1));
 text(a[m][3], x1+xdiff*4-10, y1+ydiff*(m+1));
 pop();
 }
 push();
 stroke(249,238,2);
 line(25,465,260,465);
 line(25,465,25,685);
 line(260,465,260,685);
 line(25,685,260,685);
 pop();
 line();
}