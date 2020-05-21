var canvas;
var drawing = [];
var database;
var dbDrawing = [];
var button,button2,button3,button4,button5;
var text;

function setup(){

    createCanvas(400,400);
    database = firebase.database();
    button = createButton("Reset");
    

    button2 = createButton("10 pixel pencil");
    

    button3 = createButton("25 pixel pencil");
    

    button4 = createButton("50 pixel pencil");
    

    button5 = createButton("1 pixel pencil");
   
    

    button.position(350,350);

    button5.position(300,80);

    button2.position(300,130);
   
    button4.position(300,230);
    
    button3.position(300,180);
    
}

function draw(){
    background(255);
    noFill();
    readData();
    beginShape();
    button2.mousePressed(()=>{
        strokeWeight(10);
    });
    button3.mousePressed(()=>{
        strokeWeight(25);
    });
    button4.mousePressed(()=>{
        strokeWeight(50);
    });
    button5.mousePressed(()=>{
        strokeWeight(1);
    });

    button.mousePressed(()=>{
        clearDrawing();
    });

    for(var i = 0;i<dbDrawing.length;i ++){
        vertex(dbDrawing[i].x,dbDrawing[i].y);
        endShape();
    }

    

    
}

function mouseDragged(){
    var position = {x:mouseX,y:mouseY};
    drawing.push(position);
    database.ref('drawing').set({
        'd': drawing
    })
    
}

function readData(){
    database.ref('drawing/').on("value",(data)=>{
        dbDrawing = data.val().d;
    })
}

function clearDrawing(){
    dbDrawing = [];
    database.ref("drawing").remove();
    
}

function thickness(strokethick){
    strokeWeight(strokethick);
    console.log(strokethick);
}