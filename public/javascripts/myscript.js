console.log('script loaded');

function checkImage(){
	var url = getUrl();
	var jsonString = getJsonString(url);

	setImage(url);
	getAgeAndGender(jsonString);
	getEmotion(jsonString);
}

function getJsonString(url){
	var urlObject = {};
	urlObject.url = url;
	var stringed = JSON.stringify(urlObject);
	return stringed;
}

function getUrl(){
	return $('#imageUrl').val();
}

function setImage(url){
	$('#imageHolder').attr("src", url);
}

function getEmotion(jsonString){
	$.ajax({
            type:"POST",
            contentType: "application/json",
            beforeSend: function (request)
            {
                request.setRequestHeader("Ocp-Apim-Subscription-Key", "f90f03e744a047b1bfb997a68121790d");
            },
            url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
            data: jsonString,
            processData: false,
            success: function(msg) {
                $('#angerSpan').text(getPercentage(msg[0].scores.anger));
                $('#contemptSpan').text(getPercentage(msg[0].scores.contempt));
                $('#disgustSpan').text(getPercentage(msg[0].scores.disgust));
                $('#fearSpan').text(getPercentage(msg[0].scores.fear));
                $('#happinessSpan').text(getPercentage(msg[0].scores.happiness));
                $('#neutralSpan').text(getPercentage(msg[0].scores.neutral));
                $('#sadnessSpan').text(getPercentage(msg[0].scores.sadness));
                $('#surpriseSpan').text(getPercentage(msg[0].scores.surprise));
            }
    });
}

function getPercentage(input){
	var perc = Math.floor(input * 100);
	return perc + '%';
}

function getAgeAndGender(jsonString){
	$.ajax({
            type:"POST",
            contentType: "application/json",
            beforeSend: function (request)
            {
                request.setRequestHeader("Ocp-Apim-Subscription-Key", "e49e5a0a7fb943fc9e38548a6a6bc80b");
            },
            url: "https://api.projectoxford.ai/face/v0/detections?analyzesFaceLandmarks=true&analyzesAge=true&analyzesGender=true&analyzesHeadPose=false",
            data: jsonString,
            processData: false,
            success: function(msg) {
                $('#genderSpan').text(msg[0].attributes.gender);
                $('#ageSpan').text(msg[0].attributes.age);
            }
    });
}