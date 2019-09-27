/* 2019.09.23 kang nuri */
/* login.js */


/**************************************************/

var secondsRemaining;
var intervalHandle;

$(document).ready(function(){
	
});

/* CONTENTSAREA *************************************************/

$(document).on("click",".login .list_object li", function(){
	"use strict";
	$(this).parent().find("li.active").removeClass("active");
	$(this).addClass("active");
	if($(this).hasClass("generalmb")){
		$(".inner_object.nonmb").hide();
		$(".inner_object.generalmb").show();
	}else{
		$(".inner_object.generalmb").hide();
		$(".inner_object.nonmb").show();
	}
});

$(document).on("click",".find .list_object li", function(){
	"use strict";
	$(this).parent().find("li.active").removeClass("active");
	$(this).addClass("active");
	if($(this).hasClass("findid")){
		$(".inner_object.resetpw").hide();
		$(".inner_object.findid").show();
	}else{
		$(".inner_object.findid").hide();
		$(".inner_object.resetpw").show();
	}
	$(".btnstyle2").text("인증번호 전송");
	resetstep();
	resetinterval();
});

function gofindid(){
	"use strict";
	$(".field_object.login").hide();
	$(".field_object.find").show();
	$(".list_object li.resetpw").removeClass("active");
	$(".list_object li.findid").addClass("active");
	$(".inner_object.resetpw").hide();
	$(".inner_object.findid").show();
}

function goresetpw(){
	"use strict";
	$(".field_object.login").hide();
	$(".field_object.find").show();
	$(".list_object li.findid").removeClass("active");
	$(".list_object li.resetpw").addClass("active");
	$(".inner_object.findid").hide();
	$(".inner_object.resetpw").show();
}

function gologin(){
	"use strict";
	$(".field_object.find").hide();
	$(".field_object.login").show();
	$(".btnstyle2").text("인증번호 전송");
	resetstep();
	resetinterval();
}

function gonextstep(){
	"use strict";
	resetinterval()
	if($(".list_findstep .onestep").hasClass("active")){
		$(".list_findstep .onestep").removeClass("active");
		$(".list_findstep .twostep").addClass("active");
		$(".list_findinstep .onestep").hide();
		$(".list_findinstep .twostep").show();
	}else if($(".list_findstep .twostep").hasClass("active")){
		$(".list_findstep .twostep").removeClass("active");
		$(".list_findstep .threestep").addClass("active");
		$(".list_findinstep .twostep").hide();
		$(".list_findinstep .threestep").show();
		$(".resetpw .btnstyle1").hide();
		$(".resetpw .btnstyle1.confirm").show();
	}
}

function resetstep(){
	"use strict";
	$(".list_findstep li.active").removeClass("active");
	$(".list_findstep .onestep").addClass("active");
	$(".list_findinstep .twostep").hide();
	$(".list_findinstep .threestep").hide();
	$(".list_findinstep .onestep").show();
	$(".resetpw .btnstyle1").show();
	$(".resetpw .btnstyle1.confirm").hide();
}

$(document).on("click",".findid .btnstyle2", function(){
	"use strict";
	$(this).addClass("active");
	var checkdata = $(this).parents(".list_findtype li").find(".radiogroup").is(":checked");
	if(checkdata==true){
		$(".layerpopup").show();
		$(".mask").show();
		clearInterval(intervalHandle);
		var countdown = $(this).parents(".list_findtype li").find(".authtime");
		var alertdata = $(this).parents(".inner_object").find(".alert_cont");
		alertdata.css("visibility","hidden");
		secondsRemaining = 10;
		intervalHandle = setInterval(secondsPassed,1000);
		function secondsPassed(){
			"use strict";
			var min = Math.floor(secondsRemaining/60);
			var sec = secondsRemaining-(min*60);
			if(sec<10){
				sec = "0"+sec;
			}
			var message = min+":"+sec;
			countdown.text(message);
			if(secondsRemaining===0){
				clearInterval(intervalHandle);
				alertdata.css("visibility","visible");
			}
			secondsRemaining--;
		}
	}else{
		return false;
	}
});

$(document).on("click",".resetpw .btnstyle2", function(){
	$(this).addClass("active");
	$(".layerpopup").show();
	$(".mask").show();
	clearInterval(intervalHandle);
	var countdown = $(this).parents(".list_findinstep").find(".authtime");
	var alertdata = $(this).parents(".list_findinstep").find(".alert_cont");
	alertdata.css("visibility","hidden");
	secondsRemaining = 10;
	intervalHandle = setInterval(secondsPassed,1000);
	function secondsPassed(){
		"use strict";
		var min = Math.floor(secondsRemaining/60);
		var sec = secondsRemaining-(min*60);
		if(sec<10){
			sec = "0"+sec;
		}
		var message = min+":"+sec;
		countdown.text(message);
		if(secondsRemaining===0){
			clearInterval(intervalHandle);
			alertdata.css("visibility","visible");
		}
		secondsRemaining--;
	}
});

$(document).on("click",".radiogroup",function(){
	resetinterval();
});

function resetinterval(){
	clearInterval(intervalHandle);
	$(".authtime").text("03:00");
	$(".alert_cont").css("visibility","hidden");
}

$(document).on("mouseenter",".opentooltip", function(){
	$(this).css("z-index",101);
	$(this).parents("li").find(".tooltip_box").show();
});

$(document).on("mouseleave",".opentooltip", function(){
	$(this).css("z-index",0);
	$(this).parents("li").find(".tooltip_box").hide();
});

$(document).on("click",".layerpopup .btnstyle1", function(){
	$(".btnstyle2.active").text("재전송").removeClass("active");
	$(this).parents(".layerpopup").hide();
	$(".mask").hide();
});