$( document ).ready(function() {
    
    // GET REQUEST
    $("#searchSubmit").bind("click", function(){
        clearTableHTML();
    	ajaxGet();
    });
    
    function clearTableHTML (){
        var table = $("#imdb_results")[0];
        table.innerHTML = "<tr><th>Poster</th><th>Title</th><th>Year</th><th>Type</th></tr>";
    }
    
    // DO GET
    function ajaxGet(){
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
    		    var table = $("#imdb_results")[0];
    		    var newRows = "";
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
    		},
    		error : function(e) {
    			console.log("ERROR: ", e);
    		}
    	});	
    }
});