$( document ).ready(function() {
    var currentPage = 0;
    var maxPageCount = 0;
    $("#searchSubmit").bind("click", function(){
        clearDivHTML();
    	getSearchResults();
    });
    
    $("#searchNewPage").bind("click", function(){
    	getSearchResults();
    });
    
    function clearDivHTML (){
        $("#imdb_results")[0].innerHTML = "";
        currentPage = 0;
    }
    
    function getSearchResults(){
        var name = $("input[name=name]").val();
        var year = $("input[name=year]").val();
        if (year === "") {
            year = "-1";
        }
        var category = $("input[name=category]:checked").val();
        currentPage += 1;
        
        if (currentPage === 1 || (currentPage > 1 && currentPage <= maxPageCount)) {
        	$.ajax({
        		type : "GET",
        		url : "/movieSearch/" + name + "/" + year + "/" + category + "/" + currentPage,
        		success: function(result){
        		    displayReuslts(result);
        		},
        		error : function(e) {
        			console.log("ERROR: ", e);
        		}
        	});	
    	} else {currentPage -= 1;}
    }
    
    function displayReuslts(movieResults){
        var rowDiv = $("#imdb_results")[0];
        if (movieResults.Response === "True") {
    	    var newResults = "";
    	    if (currentPage === 1) {
    	        rowDiv.innerHTML = "";
    	        maxPageCount = Math.ceil(movieResults.totalResults/10);
    	    }
    		$.each(movieResults.Search, function(i, movie){
    		    var rowHTML = getRowHTML(movie);
    		    newResults += rowHTML;
    		});
    		rowDiv.innerHTML += newResults;
    	} else {
    	    rowDiv.innerHTML = "<h1>No Results Found</h1>";
    	}
    }
    
    function getRowHTML(movie){
        var request = "'/imdb_page/" + movie.imdbID + "'";
        var onClickAttr = "window.location.href = " + request;
        var onClickString = "onclick= \"" + onClickAttr + "\"";
        if (movie.Poster !== "N/A"){
            var rowHTML = "<div id='indivResult' class='col-md-3' " + onClickString + "><div class='thumbnail'><img src='" + movie.Poster + "'><div class='caption'>" + movie.Title + "</div></div></div>";
            return rowHTML;
        } else {
            var rowHTML = "<div id='indivResult' class='col-md-3' " + onClickString + "><div class='thumbnail'><h3>" + movie.Title + "</h3><div class='caption'>" + movie.Title + "</div></div></div>";
            return rowHTML;
        }
    }
    
});