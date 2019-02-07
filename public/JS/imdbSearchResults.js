$( document ).ready(function() {
    
    // GET REQUEST
    $("#searchSubmit").bind("click", function(){
        console.log('Running Code button');
        clearTableHTML();
    	ajaxGet();
    });
    
    function clearTableHTML (){
        console.log('createTableHTML');
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
        console.log(name);
        console.log(year);
        console.log(category);
    	$.ajax({
    		type : "GET",
    		url : "/movieSearch/" + name + "/" + year + "/" + category,
    		success: function(result){
    		    var table = $("#imdb_results")[0];
    			$.each(result.Search, function(i, movie){
    			    var rowHTML = '<tr onclick="window.location.href = "/imdb_page/' + movie.imdbID + '"><td><img src="' 
    			    + movie.Poster + '"></td><td>' + movie.Title + '</a></td><td>'  + movie.Year + '</td><td>' + movie.Type 
    			    + '</td></tr>';
    			    
    			    table.innerHTML += rowHTML;
    			});
    		},
    		error : function(e) {
    			console.log("ERROR: ", e);
    		}
    	});	
    }
});