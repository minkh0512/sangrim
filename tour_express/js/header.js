/* 2019.08.30 kang nuri */
/* header.js */


$(document).on("click",".openmember", function(){
	"use strict";
	$(this).find("img").addClass("active");
	$(".menu_member").show();
});

$(document).mouseup(function(e){
	"use strict";
	var container = $(".menu_member");
	if(container.has(e.target).length===0){
		$(".openmember").find("img").removeClass("active");
		$(".menu_member").hide();
	}
});