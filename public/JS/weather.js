$( document ).ready(function() {
    //setup before functions
    var typingTimer;                //timer identifier
    var doneTypingInterval = 500;  //time in ms, 5 second for example
    var userInput = $('#weatherInput');
    
    //on keyup, start the countdown
    userInput.on('keyup', function () {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(getListOfCountries, doneTypingInterval);
    });
    
    //on keydown, clear the countdown 
    userInput.on('keydown', function () {
      clearTimeout(typingTimer);
    });
    
    //user is "finished typing," do something
    function getListOfCountries () {
      $.ajax({
    		type : "GET",
    		url : "/weather/search/" + userInput.val(),
    		success: function(result){
    		  displayList(result);
    		},
    		error : function(e) {
    			console.log("ERROR: ", e);
    		}
    	});	
    }
    
    //get List of possible locations and display in UI
    function displayList(locations) {
      var locationList = $("#locationList")[0];
      var listDiv = document.getElementById('locationList');
      var ul=document.createElement('ul');     

      for (var i in locations) {
        var location = locations[i];
        var li=document.createElement('li');
        li.setAttribute("id", "weatherResults");
        li.innerHTML = location.name;   // Use innerHTML to set the text
        li.addEventListener('click', getWeather.bind(this, location));
        ul.appendChild(li);
      }
      listDiv.appendChild(ul);
    }

    //When a locaiton is selected, then get the weather data
    function getWeather(event) {
      console.log(event);
    }

    
});