/* 2019.09.10 kang nuri */
/* bxslider.js */


$(document).ready(function(){
	setSlider();
});

function setSlider(){
	"use strict";
	$(".list_promoimg").bxSlider({
		mode: 'fade',
		auto: true,
		speed: 1200,
		controls: false,
		pagerCustom: ".list_promopage"
	});
}