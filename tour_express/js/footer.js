/* 2019.08.30 kang nuri */
/* header.js */


$(document).on("click",".openfamily", function(){
	"use strict";
	$(this).parents(".family_fnb").addClass("active");
	$(this).find("img").addClass("active");
	$(".menu_family").show();
});

$(document).mouseup(function(e){
	"use strict";
	var container = $(".menu_family");
	if(container.has(e.target).length===0){
		$(".openfamily").parents(".family_fnb").removeClass("active");
		$(".openfamily").find("img").removeClass("active");
		$(".menu_family").hide();
	}
});