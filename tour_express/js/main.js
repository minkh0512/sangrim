/* 2019.09.02 kang nuri */
/* main.js */


/**************************************************/

var mtlist=2;

$(document).ready(function(){
	rolling();
	
	//도시검색 자동완성
	smttCitySearch('#dptcity');
	smttCitySearch('#arrcity');

	//선택된 도시에 커서 포커스시 검색값 초기화
	$("input[type=text]").focus(function() {
		$(this).val('');
	});
});

/* SEARCHAREA *************************************************/

/* 왕복, 편도, 다구간 선택 */

$(document).on("click",".list_type_flight li", function(){
	"use strict";
	$(this).parent(".list_type_flight").find("li.active").removeClass("active");
	$(this).addClass("active");
});

$(document).on("click",".list_type_flight .roundtrip", function(){
	"use strict";
	$(".bx-viewport").css("padding-bottom",0);
	$("#g_onewaytrip").removeClass("active");
	$("#g_multitrip").removeClass("active");
	$("#g_roundtrip").addClass("active");
});

$(document).on("click",".list_type_flight .onewaytrip", function(){
	"use strict";
	$(".bx-viewport").css("padding-bottom",0);
	$("#g_roundtrip").removeClass("active");
	$("#g_multitrip").removeClass("active");
	$("#g_onewaytrip").addClass("active");
});

$(document).on("click",".list_type_flight .multitrip", function(){
	"use strict";
	$(".bx-viewport").css("padding-bottom",80);
	if(mtlist==3){
		$(".bx-viewport").css("padding-bottom",160);
	}else if(mtlist==4){
		$(".bx-viewport").css("padding-bottom",250);
	}
	$("#g_roundtrip").removeClass("active");
	$("#g_onewaytrip").removeClass("active");
	$("#g_multitrip").addClass("active");
});

/* 다구간 추가, 삭제 */

$(document).on("click",".whsection.addtrip", function(){
	"use strict";
	mtlist++;
	$(".list_vtldate_multi li").find("strong").text("");
	var clonedate = $(".list_vtldate_multi li:last-child").clone();
	if(mtlist==3){
		$(".bx-viewport").css("padding-bottom",160);
		$("#g_multitrip #limt_03 input").val("");
		$("#g_multitrip #limt_03").css("display","block");
		clonedate.appendTo(".list_vtldate_multi");
	}else if(mtlist==4){
		$(".bx-viewport").css("padding-bottom",250);
		$("#g_multitrip .whsection.addtrip").removeClass("active");
		$("#g_multitrip #limt_04 input").val("");
		$("#g_multitrip #limt_04").css("display","block");
		clonedate.appendTo(".list_vtldate_multi");
	}else if(mtlist==5){
		mtlist--;
		return false;
	}
	setDatepicker("MT");
});

$(document).on("click", ".whsection.deletetrip", function(){
	"use strict";
	mtlist--;
	$(".list_vtldate_multi li").find("strong").text("");
	$(".list_vtldate_multi li:last-child").remove();
	if(mtlist==3){
		$(".bx-viewport").css("padding-bottom",160);
		$("#g_multitrip .whsection.addtrip").addClass("active");
		if($(this).parents(".indexmt").attr("id")==="limt_03"){
			var fthdptct = $("#dptcity04").val();
			var ftharrct = $("#arrcity04").val();
			var fthdate = $("#startdate04").val();
			$("#dptcity03").val(fthdptct);
			$("#arrcity03").val(ftharrct);
			$("#startdate03").val(fthdate);
			$(this).parents(".list_multitrip").find(".indexmt:last-child").css("display","none");
		}else{
			$(this).parents(".list_multitrip li").css("display","none");
		}
	}
	else if(mtlist==2){
		$(".bx-viewport").css("padding-bottom",80);
		$(this).parents(".list_multitrip li").css("display","none");
	}
	setDatepicker("MT");
});

/* 출발지, 도착지 스위칭 */

$(document).on("click", ".whsection.icon", function(){
	"use strict";
	var dptdata = $(this).parent(".wbox_inner.select").find(".departure input").val();
	var arrdata = $(this).parent(".wbox_inner.select").find(".arrived input").val();
	$(this).parent(".wbox_inner.select").find(".departure input").val(arrdata);
	$(this).parent(".wbox_inner.select").find(".arrived input").val(dptdata);
});

/* 달력 */

$(document).on("click",".whsection.date", function(){
	"use strict";
	$("#Pop_calendar").addClass("active");
});

function closeCalendar(){
	"use strict";
	$("#Pop_calendar").removeClass("active");
	$(".calendar.button .btn_cont .btnstyle1").removeClass("active");
}

/* 좌석등급, 인원 */

$(document).on("click", ".whsection.passenger", function(){
	"use strict";
	if($("#g_multitrip").hasClass("active")){
		$("#Pop_passenger").css("left",430);
	}else{
		$("#Pop_passenger").css("left",480);
	}
	$("#Pop_passenger").addClass("active");
});

$(document).on("click","#Pop_passenger .btnstyleradio", function(){
	"use strict";
	$(this).parents(".btn_cont").find(".btnstyleradio.active").removeClass("active");
	$(this).addClass("active");
});

$(document).on("mouseenter",".icon_question", function(){
	"use strict";
	$(this).parent().find(".tooltip_box").show();
});

$(document).on("mouseleave",".icon_question", function(){
	"use strict";
	$(this).parent().find(".tooltip_box").hide();
});

$(document).on("click","#Pop_passenger .subvalue", function(){
	"use strict";
	var dvalue = $(this).parent().find("input").val();
	if(dvalue>0){
		dvalue--;
		$(this).parent().find(".addvalue .icon_plus").attr("src", "./img/icons/icon-plus.png");
		$(this).parent().find("input").val(dvalue);
		var adtvalue = $("#Pop_passenger").find(".editnumb.adt").val();
		var kidsvalue = $("#Pop_passenger").find(".editnumb.kids").val();
		var iftvalue = $("#Pop_passenger").find(".editnumb.ift").val();
		if(adtvalue==0&&kidsvalue==0&&iftvalue==0){
			console.log("gg");
			$("#Pop_passenger .btn_cont .btnstyle1").removeClass("active");
		}
		if(dvalue==0){
			$(this).find(".icon_minus").attr("src", "./img/icons/icon-minus-grey.png");
			return false;
		}
	}
});

$(document).on("click","#Pop_passenger .addvalue", function(){
	"use strict";
	var dvalue = $(this).parent().find("input").val();
	if(dvalue<9){
		dvalue++;
		$(this).parent().find(".subvalue .icon_minus").attr("src", "./img/icons/icon-minus.png");
		$(this).parent().find("input").val(dvalue);
		var adtvalue = $("#Pop_passenger").find(".editnumb.adt").val();
		var kidsvalue = $("#Pop_passenger").find(".editnumb.kids").val();
		var iftvalue = $("#Pop_passenger").find(".editnumb.ift").val();
		if(adtvalue==0&&kidsvalue==0&&iftvalue==0){
		}else{
			$("#Pop_passenger .btn_cont .btnstyle1").addClass("active");
		}
		if(dvalue==9){
			$(this).find(".icon_plus").attr("src", "./img/icons/icon-plus-grey.png");
			return false;
		}
	}
});

function applyPassenger(){
	"use strict";
	if($("#Pop_passenger .btn_cont .btnstyle1").hasClass("active")){
		var seatgrade = $("#Pop_passenger").find(".btnstyleradio.active").text();
		var adtnumber = $("#Pop_passenger").find(".editnumb.adt").val();
		var kidsnumber = $("#Pop_passenger").find(".editnumb.kids").val();
		var iftnumber = $("#Pop_passenger").find(".editnumb.ift").val();
		$("input#seatgrade").val(seatgrade);
			$("input#numbadt").val("성인 "+adtnumber);
			$("input#numbkids").val("소아 "+kidsnumber);
			$("input#numbift").val("유아 "+iftnumber);
		closePassenger();
	}else{
		;
	}
}

function closePassenger(){
	"use strict";
	$("#Pop_passenger").removeClass("active");
}

/* 팝업 닫기 */

$(document).mouseup(function(e){
	"use strict";
	var containerC = $("#Pop_calendar");
	var containerP = $("#Pop_passenger");
	if(containerC.has(e.target).length===0){
		closeCalendar();
	}
	if(containerP.has(e.target).length===0){
		closePassenger();
	}
});

/* CONTENTSAREA *************************************************/

function rolling(){
	"use strict";
	var rollheight = $(".rollfield").height();
	var rollnum = $(".list_rolling li").length;
	var rollmax = rollheight * rollnum;
	var move = 0;
	function noticeRolling(){
		move += rollheight;
		$(".list_rolling").animate({"top":-move}, 600, function(){
			if(move>=rollmax){
				$(this).css("top",0);
				move = 0;
			};
		});
	};
	var autoRolling = setInterval(noticeRolling, 4000);
	$(".list_rolling").append($(".list_rolling li").first().clone());
	$(".rollfield").mouseenter(function(){
		clearInterval(autoRolling);
	});
	$(".rollfield").mouseleave(function(){
		autoRolling = setInterval(noticeRolling, 4000);
	});
}