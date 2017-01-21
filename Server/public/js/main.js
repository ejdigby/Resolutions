// Setup Variables
var resolutions = []
var socket = io();
var count = 0
//Hide Cards
$(".card-container").hide();
$("header").hide();

// Check For Cookies
if (Cookies.get('added') == "true") {
	$(".title").hide()
	$(".card-container").show();
	$("header").show();
}
$( document ).ready(function() {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(".title").addClass('animated ' + "fadeInDown").one(animationEnd, function() {
                $(this).removeClass('animated ' + "fadeInDown");
                 });
    
});

$(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
    	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    	$(".title").addClass('animated ' + "zoomOut").one(animationEnd, function() {
        	$(this).removeClass('animated ' + "zoomOut");
        	$(this).hide()
        	console.log("Done")
            $(".card-container").show()
            $("header").show()

	   	 });
	}
});

//Receive Data
socket.on('data', function (data) {
 	resolutions.push(data)
 	if (count > 80){
 		;
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    	$(".card-container").find('div:first').addClass('animated ' + "bounceOutLeft").one(animationEnd, function() {
        	$(this).removeClass('animated ' + "bounceOutLeft");
        	$(".card-container").find('div:first').remove()
	   	 });
 	}
 	$(".card-container").append("<div class='card'><p>" + data + " </p></div>")
 	count ++;

	});




$(".add").click(function(e) {

		//Animate Title
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    


    		$("header").addClass('animated ' + "fadeOutUp").one(animationEnd, function() {
    		    $("header").removeClass('animated ' + "fadeOutUp");
        	    $(this).hide()
        		});
			$(".card-container").hide();
                        $("header").hide();
   			$(".title").show();
        		$(".title").addClass('animated ' + "fadeInDown").one(animationEnd, function() {
			  	$(".card-container").hide();
			     $("header").hide();
    		    $("header").removeClass('animated ' + "fadeOutUp");
			});


	   	 
	e.preventDefault();

});


//Form Handling
$("form").submit(function(e) {
	//Disallow empty inputs
    if ((($(".input").val()).trim()) == ""){
    	alert("Please enter a value")
    } 
   	else {
		$.ajax({
	       type: "POST",
	       url: "/",
	       data: $(".input").serialize(), // serializes the form's elements.
	       success: function(data){}
	    });

		//Animate Title
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    	$(".title").addClass('animated ' + "zoomOut").one(animationEnd, function() {
        	$(this).removeClass('animated ' + "zoomOut");
        	$(this).hide()
        	console.log("Done")
            Cookies.set('added', true)
            $(".card-container").show()
            $("header").show()

	   	 });

	}
	e.preventDefault();
});


// Maintenance Function
var removecookies = function(){
	Cookies.remove('added')
}

//(this).find('span:first').remove();
