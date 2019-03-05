window.commonScript = (function(){
	var method = {}
	var member = {}

	method.init = function(){
		method.setElements();
		method.bindEvents();
	};

	method.setElements = function(){
		member.gnbButtonWrap = $('.gnb_wrap');
		member.gnbContent1 = $('#gnb_menu1');
		member.gnbContent2 = $('#gnb_menu2');
		member.searchBoxWrap = $('.search_box_wrap');
		member.buttonOpenSearchBox = $('.nav_search a');
		member.buttonCloseSearchBox = member.searchBoxWrap.find('.btn_close');
		member.siteMapWrap = $('.layer_sitemap')
		member.buttonOpenSiteMap = $('.nav_sitemap a');
		member.buttonCloseSiteMap = member.siteMapWrap.find('.btn_close');
		member.buttonNav = $('.gnb_wrap .btn_nav');
		member.navContent = $('.gnb_wrap .gnb_menu');
		member.buttonTop = $('.btn_top');
	};

	method.bindEvents = function(){
		member.buttonOpenSearchBox.on('click', method.openSearchBoxFunc);
		member.buttonCloseSearchBox.on('click', method.closeSearchBoxFunc);
		member.buttonOpenSiteMap.on('click', method.openSiteMapFunc);
		member.buttonCloseSiteMap.on('click', method.closeSiteMapFunc);
		member.buttonNav.on('mouseenter', $.proxy(method.openNavMenuFunc,this));
		member.navContent.on('mouseleave', method.closeNavMenuFunc)
		member.navContent.parent('li').on('mouseleave', method.closeNavMenuFunc)
		$(window).on('scroll', method.buttonTopScrollFunc);
	};

	method.openSearchBoxFunc = function(e){
		e.preventDefault();
		member.searchBoxWrap.show();
	};

	method.closeSearchBoxFunc = function(){
		member.searchBoxWrap.hide();
	}

	method.openSiteMapFunc = function(e){
		e.preventDefault();
		member.siteMapWrap.show();
	};

	method.closeSiteMapFunc = function(){
		member.siteMapWrap.hide();
	};

	method.openNavMenuFunc = function(e){
		e.preventDefault();
		member.navContent.hide();
		var target = $(e.currentTarget);
		var idx = target.parent('li').index();
		target.next('.gnb_menu').show()
	};

	method.closeNavMenuFunc = function(){
		member.navContent.hide();
	};

	method.buttonTopScrollFunc = function(){
		var total_height = $('#wrap').height();
		var win_height = $(window).height();
		var foot_height = $('.footer_wrap').height();
		var f_offset = $('.footer_wrap').offset().top;
		var w_sc_top = $(window).scrollTop();
		if(w_sc_top < total_height - win_height - foot_height){
			member.buttonTop.addClass('fixed').removeClass('absolute');
			member.buttonTop.css('top','');
		}else{
			member.buttonTop.addClass('absolute').removeClass('fixed');
			member.buttonTop.css('top',f_offset-84);
		};
	};

	return {
		init : method.init
	}
})();

window.subNavigation = function(){
	var method = {}
	var member = {}
	var option = {}

	method.init = function(){
		method.setElements();
		method.bindEvents();
	};

	method.setElements = function(){
		member.subNavWrap = $('.sub_nav_wrap');
		member.btnNavWrap = member.subNavWrap.find('dl').parent('li');
		member.btnNav = member.subNavWrap.find('dt a');
	};

	method.setOptions = function(){
		option.navLength = member.subNavWrap.find('dl dd').length
		option.navShowhight =  (option.navLength * 40) + 50;
	};

	method.bindEvents = function(){
		member.btnNav.on('mouseenter', $.proxy(method.navShowFunc,this));
		member.btnNavWrap.on('mouseleave', $.proxy(method.navHideFunc,this))
	};

	method.navShowFunc = function(e){
		var target = $(e.currentTarget);
		var idx = target.parents('li').index();
		var menu_height = (member.subNavWrap.find('li').eq(idx).find('dd').length * 40) + 50;
		member.subNavWrap.find('li').eq(idx).find('dl').animate({
			'height' : menu_height
		}, 300);
	};

	method.navHideFunc = function(){
		member.subNavWrap.find('dl').stop(true,true).height(50);
	};

	return {
		init : method.init
	}

}();

$(function(){
	window.commonScript.init();
	window.subNavigation.init();
});