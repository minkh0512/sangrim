/* 2019.09.02 kang nuri */
/* datepicker.js */


var initFormCodeFlg="RT";
var setdefault = new Date();

$(document).ready(function(){
	setDatepicker();
});

function setDatepicker(tripcode){
	$("#datePicker").datepick("destroy");
	// 여행 설정 (왕복,편도,다구간)
	var multiSelect = 2;
	var multiSelectCnt = 2;
	if(tripcode == "RT"){
		multiSelect = 2;
		multiSelectCnt = 2;
		initFormCodeFlg="RT";
	}else if(tripcode == "OW"){
		multiSelect = 0;
		initFormCodeFlg="OW";
	}else if(tripcode == "MT"){
		multiSelectCnt = mtlist;
		multiSelect = multiSelectCnt;
		initFormCodeFlg="MT";
	}
	$("#datePicker").datepick({
		minDate: new Date().addDays(2),
		maxDate: '+365',
		firstDay: 0,
		showOtherMonths: false,
		selectOtherMonths: true,
		monthsToShow: 2,
		platForm: '',
		changeMonth: false,
		multiSelect : multiSelect,
		defaultDate: setdefault,
		renderer: {
			picker: '{months}',
      		monthRow: '{months}',
      		month:
	    	  	'<div class="k1_cal_wrap">'
	            +'<table class="k1_cal_board ui-datepicker-calendar" style="float:left;">'
	            + '<div class="k1_cal_header">'
	            + '<a href="" class="btn_prev" role="moveToPrev"><span>&lsaquo;</span></a>'
	            + '{monthHeader:yyyy. M}'
	            + '<a href="" class="btn_next" role="moveToNext"><span>&rsaquo;</span></a>'
	            + '</div>'
	            + '<colgroup>'
	            + '<col>'
	            + '<col>'
	            + '<col>'
	            + '<col>'
	            + '<col>'
	            + '<col>'
	            + '<col>'
	            + '</colgroup>'
	            + '<thead>'
	            +'{weekHeader}'
	            + '</thead>'
	            + '<tbody>'
	            + '{weeks}'
	            + '</tbody>'
	          	+ '</table>'
	          	+ '</div>',
	        weekHeader: '<tr>{days}</tr>',
		    dayHeader: '<th>{day}</th>',
		    week: '<tr>{days}</tr>',
		    day: '<td>{day}</td>',
		    monthSelector: '',
		    daySelector: 'td',
		    rtlClass: '',
		    multiClass: '',
		    defaultClass: '',
		    selectedClass: 'selected',
		    highlightedClass: '',
		    todayClass: 'today',
		    startClass: 'start',
		    endClass: 'end',
		    middleClass: 'middle',
		    otherMonthClass: '',
		    saturdayClass: 'sat',
		    sundayClass: 'holiday',
		    commandButtonClass: '',
		    commandLinkClass: '',
		    disabledClass: 'disable'
		},
		onSelect : function(dates){ // 코드 값
			var idx=dates.length-1;
			curDt=new Date(dates[idx]);
			var yyyy=curDt.getFullYear().toString();
			var mm=(curDt.getMonth()+1).toString();
			var dd=curDt.getDate().toString();
			if(mm<10){
				mm="0"+mm;
			}
			if(dd<10){
				dd="0"+dd;
			}
			// 왕복일 경우
			if(initFormCodeFlg=="RT"){
				var bottomCount=$("#initRT").find("strong").length-1;
				if(idx==0){
					$("#initRT").find("strong").eq(bottomCount).text("");
				}
				$("#initRT").find("strong").eq(idx).text(yyyy+"."+mm+"."+dd);
				setTimeout(function(){
					$(".middle").parent().addClass("active");
					$(".middle").eq(0).addClass("start");
					$(".middle").eq(0).removeClass("middle");
					$(".calendar.button .btn_cont .btnstyle1").removeClass("active");
					// 여기까지 가는날 셀렉트
					if(idx==(multiSelectCnt-1)){
						var middleTotalCount=$(".middle").length;
						$(".middle").eq((middleTotalCount-1)).addClass("end");
						$(".middle").eq((middleTotalCount-1)).removeClass("middle");
						// 여기까지 오는날 셀렉트
						$(".calendar.button .btn_cont .btnstyle1").addClass("active");
						// 버튼 활성화
					}
				}, 10);
			}
			// 편도일 경우
			else if(initFormCodeFlg=="OW"){
				$("#initOW").find("strong").eq(idx).text(yyyy+"."+mm+"."+dd);
				$(".calendar.button .btn_cont .btnstyle1").addClass("active");
				// 버튼 활성화
			}
			// 다구간일 경우
			else if(initFormCodeFlg=="MT"){
				if(idx==0){
					$("#initMT").find("strong").eq(0).text("");
					$("#initMT").find("strong").eq(1).text("");
					$("#initMT").find("strong").eq(2).text("");
					$("#initMT").find("strong").eq(3).text(""); // 총 0 ~ 3까지 4개 다구간 가능
				}
				$("#initMT").find("strong").eq(idx).text(yyyy+"."+mm+"."+dd);
				setTimeout(function(){
					$(".middle").parent().addClass("active");
					$(".middle").eq(0).addClass("start");
					$(".middle").eq(0).removeClass("middle");
					$(".calendar.button .btn_cont .btnstyle1").removeClass("active");
					// 여기까지 가는날 셀렉트
					if(idx==(multiSelectCnt-1)){
						var middleTotalCount=$(".middle").length;
						$(".middle").eq((middleTotalCount-1)).addClass("end");
						$(".middle").eq((middleTotalCount-1)).removeClass("middle");
						// 여기까지 오는날 셀렉트
						$(".calendar.button .btn_cont .btnstyle1").addClass("active");
					}
				}, 10);
				setTimeout(function(){
					if(idx==0){
					}else{
						if($("#initMT").find("strong").eq((idx-1)).text()==$("#initMT").find("strong").eq(idx).text()){
						}
					}
				}, 10);
			}
			//$("#datePicker").datepick("option",{defaultDate: dates[0]}, "+2");
		},
		onShow : function(picker, inst){
			picker.css("width", "350");
			picker.eq(0).find(".btn_next").hide(); // 왼쪽 달력 다음달 버튼 삭제
			picker.eq(1).find(".btn_prev").hide(); // 오른쪽 달력 이전달 버튼 삭제
		},
		onDate : function(date, current){
			return {}; // 공휴일 지정
		}
	});
}

function applyCalendar(){
	var tripcode = "RT";
	if($(".list_type_flight .roundtrip").hasClass("active")){
		var tripcode = "RT";
		var dateCount = $("#initRT").find("strong").length;
		for(var i=0;i<dateCount;i++){
			if($("#initRT").find("strong").eq(i).text()==""){
				if(i==0){
					//alert("가는 날을 선택해 주세요.");
					return false;
				}
				if(i==1){
					//alert("오는 날을 선택해 주세요.");
					return false;
				}
			}
		}
		// 요일 및 날짜 세팅
		var depDt = $("#initRT").find("strong").eq(0).text();
		var arrDt = $("#initRT").find("strong").eq(1).text();
		var depWeek = getWeekDay(depDt);
		var arrWeek = getWeekDay(arrDt);
		$("#g_roundtrip #startdate").attr("value",depDt+"("+depWeek+")");
		$("#g_roundtrip #enddate").attr("value",arrDt+"("+arrWeek+")");

	}else if($(".list_type_flight .onewaytrip").hasClass("active")){
		var tripcode = "OW";
		if($("#initOW").find("strong").text()==""){
			//alert("가는 날을 선택해 주세요.");
			return false;
		}
		// 요일 및 날짜 세팅
		var depDt = $("#initOW").find("strong").eq(0).text();
		var depWeek = getWeekDay(depDt);
		$("#g_onewaytrip #startdate").attr("value",depDt+"("+depWeek+")");

	}else if($(".list_type_flight .multitrip").hasClass("active")){
		var tripcode = "MT";
		if($("#g_multitrip #limt_01").css("display")!="none"){
			if($("#initMT").find("strong").eq(0).text()==""){
				//alert("첫번째 여정을 선택해 주세요.");
				return false;
			}
		}
		if($("#g_multitrip #limt_02").css("display")!="none"){
			if($("#initMT").find("strong").eq(1).text()==""){
				//alert("두번째 여정을 선택해 주세요.");
				return false;
			}
		}
		if($("#g_multitrip #limt_03").css("display")!="none"){
			if($("#initMT").find("strong").eq(2).text()==""){
				//alert("세번째 여정을 선택해 주세요.");
				return false;
			}
		}
		if($("#g_multitrip #limt_04").css("display")!="none"){
			if($("#initMT").find("strong").eq(3).text()==""){
				//alert("네번째 여정을 선택해 주세요.");
				return false;
			}
		}
		// 요일 및 날짜 세팅
		var depDt = {};
		var depWeek = {};
		for(var i=0;i<mtlist;i++){
			depDt[i] = $("#initMT").find("strong").eq(i).text();
			depWeek[i] = getWeekDay(depDt[i]);
			var multiId="startdate0"+(i+1);
			$("#g_multitrip").contents().find("input[id="+multiId+"]").attr("value",depDt[i]+"("+depWeek[i]+")");
		}
	}
	closeCalendar();
}

Date.prototype.addDays=function(s) {
	var targetDays=parseInt(s);
	var thisYear=parseInt(this.getFullYear());
	var thisDays=parseInt(this.getDate());
	var thisMonth=parseInt(this.getMonth() + 1);
	var currDays=thisDays;
	var currMonth=thisMonth;
	var currYear=thisYear;
	var monthArr;
	// 일반 달력(2월 28일까지)
	var nonleap=[ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
	// 윤달 달력(2월 29일까지)
	var leap=[ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
	if ((thisYear%4)==0) {
		if ((thisYear%100)==0 && (thisYear%400)!=0){
			monthArr=nonleap;
		}else{
			monthArr=leap;
		}
	}else{
		monthArr=nonleap;
	}
	var daysCounter=0;
	var numDays=0;
	var monthDays=0;
	if(targetDays<0){
		while(daysCounter<(targetDays*-1)){
			if(daysCounter==0) {
				if((targetDays*-1)<thisDays){
					break;
				}else{
					daysCounter=thisDays;
				}
			}else{
				numDays=monthArr[currMonth-1];
				daysCounter += parseInt(numDays)
			}
			if(daysCounter>(targetDays*-1)){
				break;
			}
			currMonth=currMonth-1;
			if(currMonth==0){
				currYear=currYear-1;
				if((currYear%4)==0){
					if((currYear%100)==0 && (currYear%400)!=0){
						monthArr=nonleap;
					}else{
						monthArr=leap;
					}
				}else{
					monthArr=nonleap;
				}
				currMonth=12;
			}
		}
		t=this.getTime();
		t+=(targetDays*86400000);
		this.setTime(t);
		var thisDate=new Date(currYear, currMonth-1, this.getDate());
		return thisDate;
	}else{
		var diffDays=monthArr[currMonth-1]-thisDays;
		numDays=0;
		var startedC=true;
		while(daysCounter<targetDays){
			if(daysCounter==0 && startedC==true){
				monthDays=thisDays;
				startedC=false;
			}else{
				monthDays++;
				daysCounter++;
				if(monthDays>monthArr[currMonth-1]){
					currMonth=currMonth+1;
					monthDays=1;
				}
			}
			if(daysCounter>targetDays){
				break;
			}
			if(currMonth==13) {
				currYear=currYear+1;
				if((currYear%4)==0) {
					if((currYear%100)==0 && (currYear%400)!=0){
						monthArr=nonleap;
					}else{
						monthArr=leap;
					}
				}else{
					monthArr=nonleap;
				}
				currMonth=1;
			}
		}
		var thisDate=new Date(currYear, currMonth - 1, monthDays);
		return thisDate;
	}
};

function getWeekDay(dt) {
  var week = [ '일', '월', '화', '수', '목', '금', '토' ];
  var dayOfWeek = week[new Date(dt.replace(/\./g,"-")).getDay()];
  return dayOfWeek;
}

// 이전 달 보기
$('body').on('click', '[role=moveToPrev]', function(e) {
    e.preventDefault();
    $('#datePicker').datepick('changeMonth', -2);
    setdefault.setMonth(setdefault.getMonth()-2);
});

// 다음 달 보기
$('body').on('click', '[role=moveToNext]', function(e) {
    e.preventDefault();
    $('#datePicker').datepick('changeMonth', 2);
    setdefault.setMonth(setdefault.getMonth()+2);
});