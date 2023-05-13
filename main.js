song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center(); 

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function draw(){
    image(video, 0 , 0, 600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist >0.1){
      circle(leftWristX,leftWristY,20);
      inNumberleftwristY = Number(leftWristY);
      remove_decimals = floor(inNumberleftwristY);
      volume = remove_decimals/500;
      song.setVolume(volume);
      document.getElementById("volume").innerHTML = "Volume:" + volume;
      
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
 function gotPoses(results) {
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("left wrist X = " + leftWristX + ", left wrist Y = " + leftWristY);
        console.log("right wrist X = " + rightWristX + ", right wrist Y = " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score left wrist ="+ scoreLeftWrist);

    }
 }