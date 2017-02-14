$(document).ready(function(){
 	$("body").append('<div id="header"></div>');
	$("body").append('<ul class="list-group"></ul>');	
	$("<h1></h1>").html("Web Systems Development").appendTo("body div");
});


$.ajax({
	type: "GET",
	url: "./resources/quiz1.xml",
	dataType: "xml",
	success : function(xml) {
		$(xml).find('lab').each(function(){
			var link = $(this).find('link').text();
			var labNum = $(this).find('labNum').text();
			var name = $(this).find('name').text();
			var description = $(this).find('description').text();
			$("<li class='list-group-item'></li>").html('<a href="' + link + '">' + labNum 
				+ '</a>').appendTo("body ul");
			$("<li class='list-group-item'></li>").html("Name  " + name).appendTo("body ul");
			$("<li class='list-group-item'></li>").html("Description:  " + description).appendTo("body ul");
		});
		$(xml).find('homework').each(function(){
			var link = $(this).find('link').text();
			var homeworkNum = $(this).find('homeworkNum').text();
			var name = $(this).find('name').text();
			var description = $(this).find('description').text();
			$("<li class='list-group-item'></li>").html('<a href="' + link + '">' + homeworkNum 
				+ '</a>').appendTo("body ul");
			$("<li class='list-group-item'></li>").html("Name  " + name).appendTo("body ul");
			$("<li class='list-group-item'></li>").html("Description:  " + description).appendTo("body ul");
		});
	},
	error : function() {
		alert("The XML file cannot be reached.");
	}
});
 
