$( document ).ready(function() {
    
    $("#searchSubmit").bind("click", function(){
        clearTableHTML();
    	getSearchResults();
    });
    
    function clearTableHTML (){
        $("#imdb_results")[0].innerHTML = "";
    }
    
    function getSearchResults(){
        var name = $("input[name=name]").val();
        var year = $("input[name=year]").val();
        if (year === "") {
            year = "-1";
        }
        var category = $("input[name=category]").val();
        
    	$.ajax({
    		type : "GET",
    		url : "/movieSearch/" + name + "/" + year + "/" + category,
    		success: function(result){
    		    console.log(result);
    		    var table = $("#imdb_results")[0];
    		    if (result.Response === "True") {
        		    var newRows = "";
        		    table.innerHTML = "<tr><th>Poster</th><th>Title</th><th>Year</th><th>Type</th></tr>";
        			$.each(result.Search, function(i, movie){
        			    var request = "'/imdb_page/" + movie.imdbID + "'";
        			    var onClickAttr = "window.location.href = " + request;
        			    var onClickString = "onclick= \"" + onClickAttr;
        			    
        			    var rowStart = "<tr " + onClickString + ";\">";
        			    var posterCell = "<td><img src='" + movie.Poster + "'></td>";
        			    var titleCell = "<td>" + movie.Title + "</td>";
        			    var yearCell = "<td>" + movie.Year + "</td>";
        			    var typeCell = "<td>" + movie.Type + "</td>";
        			    var rowEnd = "</tr>";
        			    
        			    var rowHTML = rowStart + posterCell + titleCell + yearCell + typeCell + rowEnd;
        			    newRows += rowHTML;
        			});
        			
        			table.innerHTML += newRows;
        		} else {
        		    table.innerHTML = "<h1>No Results Found</h1>";
        		}
    		},
    		error : function(e) {
    			console.log("ERROR: ", e);
    		}
    	});	
    }
});