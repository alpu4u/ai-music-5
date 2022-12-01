song1='';
song2='';
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
songStatus = '';
songStatus2 = '';
function preload()
{
    song1=loadSound("We_Will_Rock_You.mp3");
    song2=loadSound("Who_Let_The_Dogs_Out.mp3");
}

function playSong1()
{
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}

function playSong2()
{
    song2.play();
    song2.setVolume(1);
    song2.rate(1);
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();
    
    poseNet=ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("green");
    stroke("red");
   
    songStatus = song1.isPlaying();
      //  document.getElementById('songName').innerHTML= 'Song ='+ "Who_Let_The_Dogs_Out";
    
    if(songStatus == true){
//      songStatus = song1.isPlaying();
        document.getElementById('songName').innerHTML= 'Song ='+ "We_Will_Rock_You";
    }
    if (scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 30);
    song1.stop();
    if(songStatus == false){
        playSong2();
        document.getElementById('songName').innerHTML= 'Song ='+ "Who_Let_The_Dogs_Out";
    }
    }
    songStatus2 = song2.isPlaying();
   
    if (scoreRightWrist > 0.2)
    {
    circle(rightWristX, rightWristY, 30);
    song2.stop();
    if(songStatus2 == false){
        playSong1();
        document.getElementById('songName').innerHTML= 'Song ='+ "We_Will_Rock_You";
    }
    }
}

function modelLoaded()
{
    console.log('Pose Net is Loaded')
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results)
        scoreLeftWrist=results[0].pose.keypoints[9].score
        console.log("scoreLeftWrist =" + scoreLeftWrist)
        leftWristX= results[0].pose.leftWrist.x
        leftWristY= results[0].pose.leftWrist.y
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY)

        rightWristX= results[0].pose.rightWrist.x
        rightWristY= results[0].pose.rightWrist.y
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY)
    }
}   
