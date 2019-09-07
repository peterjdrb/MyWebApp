$( document ).ready(function() {
  //setup before functions
  var typingTimer;                //timer identifier
  var doneTypingInterval = 500;  //time in ms, 5 second for example
  var userInput = $("#weatherInput");
    
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
    //Empty any existing results
    var listDiv = document.getElementById("locationList");
    listDiv.innerHTML = "";

    //Create a new list to hold the search results
    var ul=document.createElement("ul");     
    ul.setAttribute("id", "weatherResults");

    if (locations !== "Page not found") {
      //For each result, generate the appropriate li tag.
      for (var i in locations) {
        var location = locations[i];
        var li=document.createElement("li");
        li.className += "searchItem";
        li.innerHTML = location.name;   // Use innerHTML to set the text
        li.addEventListener("click", getWeather.bind(this, location));
        ul.appendChild(li);
      }
      listDiv.appendChild(ul);
    }
  }

  //When a locaiton is selected, then get the weather data
  function getWeather(location) {
    document.getElementById("weatherInput").value = location.name;
    var listDiv = document.getElementById("locationList");
    listDiv.innerHTML = "";

    //call serverside function to ge weather data
    $.ajax({
      type : "GET",
      url : "/weather/data/" + location.url,
      success: function(result){
        console.log(result);
      },
      error : function(e) {
        console.log("ERROR: ", e);
      }
    }); 
  }

    //on keyup, start the countdown
    userInput.on("keyup", function () {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(getListOfCountries, doneTypingInterval);
    });
    
    //on keydown, clear the countdown 
    userInput.on("keydown", function () {
      clearTimeout(typingTimer);
    });
    
});




