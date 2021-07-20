prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350, height: 300, image_format: 'png', png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'">';
    });
}

console.log("ml5 version: ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/BEJIpdMhC/model.json", modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);

        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        if(results[0].label == "&#128522"){
            document.getElementById("update_emoji").innerHTML = "👌";
        }
        if(results[0].label == "&#128532"){
            document.getElementById("update_emoji").innerHTML = "👍";
        }
        if(results[0].label == "&#128548"){
            document.getElementById("update_emoji").innerHTML = "✌";
        }
    }
}