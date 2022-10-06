Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');
console.log(ml5.version);
clasifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/MdLg-_UI8/model.json",modelLoaded);
function modelLoaded(){
    console.log("Model is loaded");
}

function takePhoto(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

function identify(){
    objectIdentify=document.getElementById("captured_image");
    clasifier.classify(objectIdentify,gotResult);
}

function gotResult(error,results){
    if (error){
console.log("error:",error);
    }
    else{
        console.log(results);
        document.getElementById("personName").innerHTML=results[0].label;
        document.getElementById("personAccuracy").innerHTML=results[0].confidence.toFixed(2)*100;
    }
}