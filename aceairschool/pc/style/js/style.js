window.headNavgation = (function(){
	var method = {}
	var member = {}

	method.init = function(){
		method.setElements();
		method.initLayout();
		method.bindEvents();
	};

	method.setElements = function(){
		member.navWrap = $('.gnb_wrap');
		member.navBackground = $('.gnb_bg');
		member.navDepth1 = $('.nav_gnb');
		member.navDepth2 = $('.nav_2depth');
		member.btnDepth1 = $('.btn_depth1');
		member.btnDepth2 = $('.btn_depth2');
	};

	method.initLayout = function(){
		member.navDepth2.hide();
		member.navBackground.hide();
	};

	method.bindEvents = function(){
		member.btnDepth1.on('mouseenter', $.proxy(method.navShowFunc,this));
		member.btnDepth2.on('mouseenter', $.proxy(method.mouseHoverFunc,this));
		member.navWrap.on('mouseleave', $.proxy(method.navHideFunc,this))
	};

	method.navShowFunc = function(){
		member.navBackground.slideDown(200);
		member.navDepth2.slideDown(200);
	};

	method.navHideFunc = function(){
		member.navBackground.stop(true,true).slideUp(100);
		member.navDepth2.stop(true,true).hide();
		member.navDepth1.find('.nav_list').removeClass('on');
	};

	method.mouseHoverFunc = function(e){
		var target = $(e.currentTarget);
		member.navDepth1.find('.nav_list').removeClass('on');
		target.parents('.nav_list').addClass('on');
	};

	return {
		init : method.init
	}

})();

window.quickMenuShowHide = (function(){
	var method = {}
	var member = {}
	var option = {}

	method.init = function(){
		method.setElements();
		method.setOptions();
		method.initLayout();
		method.bindEvents();
	};

	method.setElements = function(){
		member.quickMenuWrap = $('.quick_menu_wrap');
		member.btnQuickSub5 = member.quickMenuWrap.find('.btn_quick');
		member.btnQuickClose = member.quickMenuWrap.find('.btn_close');
		member.btnSlide = member.quickMenuWrap.find('.btn_slide');
	};

	method.setOptions = function(){
		option.quickMenuWidth = member.quickMenuWrap.width();
	};

	method.initLayout = function(){
		member.btnSlide.addClass('on').text('접기');
	};

	method.bindEvents = function(){
		member.btnQuickClose.on('click',  $.proxy(method.quickCloseFunc,this));
		member.btnSlide.on('click',  $.proxy(method.quickMenuShowHideFunc,this));
	};

	method.quickCloseFunc = function(e){
		e.preventDefault();
		member.btnQuickSub5.hide();
	};

	method.quickMenuShowHideFunc = function(e){
		e.preventDefault();
		if(member.btnSlide.hasClass('on')){
			member.quickMenuWrap.animate({
				'right' : -(option.quickMenuWidth)
			},300);
			member.btnSlide.removeClass('on').text('펴기');
		}else{
			member.quickMenuWrap.animate({
				'right' : 0
			},300);
			member.btnSlide.addClass('on').text('접기');
		}
	};

	return {
		init : method.init
	}

})();

window.mainThumbImageSlider = (function(){
	var method = {}
	var member = {}
	var option = {}

	method.init = function(){
		method.setElements();
		method.setOptions();
		method.initLayout();
		method.bindEvents();
	};

	method.setElements = function(){
		member.slideWrap = $('.image_viewer_wrap');
		member.detailImageWrap = $('.detail_image_list');
		member.thumbImageWrap = $('.image_list_wrap');
		member.btnPrev = member.slideWrap.find('.btn_prev');
		member.btnNext = member.slideWrap.find('.btn_next');
		member.btnThumb = member.slideWrap.find('.btn_image');
		member.ScrollWrap = $('.thumb_image');
	};

	method.setOptions = function(){
		option.ImageLength = member.detailImageWrap.find('li').length;
		option.detailImageWidth = 1200;
		option.thumbImageWidth = 189;
		option.moveImageLeft = 0;
		option.moveThumbLeft = 0;
	};

	method.initLayout = function(){
		member.detailImageWrap.css('width',option.ImageLength*option.detailImageWidth);
		member.thumbImageWrap.css('width',option.ImageLength*option.thumbImageWidth);
	};

	method.bindEvents = function(){
		member.btnPrev.on('click', method.moveLeftFunc);
		member.btnNext.on('click', method.moveRightFunc);
		member.btnThumb.on('click', $.proxy(method.moveThumbFunc,this));
	};

	method.moveRightFunc = function(e){
		e.preventDefault();
		option.ThumbImageActiveIndex = member.thumbImageWrap.find('.active').index();
		if(option.ThumbImageActiveIndex < option.ImageLength-1){
			option.moveImageLeft = option.moveImageLeft - option.detailImageWidth
			member.detailImageWrap.stop(true,true).animate({
				left : option.moveImageLeft
			});
			member.thumbImageWrap.find('.active').removeClass('active');
			member.thumbImageWrap.find('li').eq(option.ThumbImageActiveIndex + 1).addClass('active');
		}
		method.scrollMoveFunc();
	};

	method.moveLeftFunc = function(e){
		e.preventDefault();
		option.ThumbImageActiveIndex = member.thumbImageWrap.find('.active').index();
		if(option.ThumbImageActiveIndex > 0){
			option.moveImageLeft = option.moveImageLeft + option.detailImageWidth
			member.detailImageWrap.stop(true,true).animate({
				left : option.moveImageLeft
			});
			member.thumbImageWrap.find('.active').removeClass('active');
			member.thumbImageWrap.find('li').eq(option.ThumbImageActiveIndex - 1).addClass('active');
		}
		method.scrollMoveFunc();
	};

	method.moveThumbFunc = function(e){
		e.preventDefault();
		var prevBtnIndex = member.thumbImageWrap.find('.active').index();
		var target = $(e.currentTarget);
		var targetIndex = target.parent('li').index();
		member.thumbImageWrap.find('li').removeClass('active').eq(targetIndex).addClass('active');
		var nextBtnIndex = member.thumbImageWrap.find('.active').index();
		method.scrollMoveFunc();
		if(prevBtnIndex > nextBtnIndex){
			option.moveImageLeft = -(option.detailImageWidth * nextBtnIndex);
			member.detailImageWrap.stop(true,true).animate({
				left : option.moveImageLeft
			});
		}else if(prevBtnIndex < nextBtnIndex){
			option.moveImageLeft = -(option.detailImageWidth * nextBtnIndex);
			member.detailImageWrap.stop(true,true).animate({
				left : option.moveImageLeft
			});
		}
	};

	method.scrollMoveFunc = function(){
		var currentActive = $('.image_list.active').index();
		var maxRightMove = member.thumbImageWrap.width() - member.ScrollWrap.width() + 11;
		var maxLeftMove = 0
		var scrollMove;
		if(currentActive == 0){
			scrollMove = maxLeftMove;
		}else if(currentActive == option.ImageLength-1){
			scrollMove = maxRightMove;
		}else{
			scrollMove = maxRightMove / option.ImageLength * currentActive;
		}
		member.ScrollWrap.scrollLeft(scrollMove);
	};

	return {
		init : method.init
	}
})();

window.mainTabScroll = function(){
	var scrollTopPostion;
	$('.tab_content .btn_tab').on('click',function(e){
		e.preventDefault();
		var idx = $(this).parent('.nav_list').index();
		var scTop = $('.tab_content').eq(idx).offset().top;
		scrollTopPostion = scTop;
		$('html, body').animate({'scrollTop' : scrollTopPostion}, 500);
	});
};

window.memberListTab = function(){
	$('.sub_tab a').on('click',function(e){
		e.preventDefault();
		var idx = $(this).parent('li').index();
		$(this).parent('li').siblings().removeClass('active');
		$(this).parent('li').addClass('active');
		if(idx == 0){
			$('.member_list li').show();
		}else{
			$('.member_list li').hide();
			$('.member_list li.tab' + idx).show();
		}
	});
};

window.subNavigation = function(){
	var method = {}
	var member = {}
	var option = {}

	method.init = function(){
		method.setElements();
		method.setOptions();
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

	method.navShowFunc = function(){
		member.subNavWrap.find('dl').animate({
			'height' : option.navShowhight
		}, 300);
	};

	method.navHideFunc = function(){
		member.subNavWrap.find('dl').stop(true,true).animate({
			'height' : 50
		}, 300);
	};

	return {
		init : method.init
	}

}();

window.subTabFunc = function(){
	$('.sub_tab a').on('click',function(e){
		e.preventDefault();
		var idx = $(this).parent('li').index();
		$('.sub_tab li').removeClass('active').eq(idx).addClass('active');
		$('.sub_tab_cont .tab_cont').removeClass('active').eq(idx).addClass('active');

	});
};

window.subTabScroll = function(){
	var scrollTopPostion;
	$('.tab_scroll_wrap .sub_tab a').on('click',function(e){
		e.preventDefault();
		var idx = $(this).parent('li').index();
		var scTop = $('.sub_tab').eq(idx).offset().top;
		scrollTopPostion = scTop;
		$('html, body').animate({'scrollTop' : scrollTopPostion}, 500);
	});
};

window.subImageTabScroll = function(){
	var scrollTopPostion;
	$('.tab_tit_img a').on('click',function(e){
		e.preventDefault();
		var idx = $(this).parent('li').index();
		var scTop = $('.tab_tit_img').eq(idx).find('ul').offset().top;
		scrollTopPostion = scTop;
		$('html, body').animate({'scrollTop' : scrollTopPostion}, 500);
	});
};

window.subPassSwiper = function(){
	var method = {}
	var member = {}
	var option = {}

	method.init = function(){
		method.setElements();
		method.setOptions();
		method.bindEvents();
	};

	method.setElements = function(){
		member.swiperWrap = $('.pass_list_wrap');
		member.scrollWrap = member.swiperWrap.find('.swiper-wrapper');
		member.swiperList = member.swiperWrap.find('.swiper-slide');
		member.buttonPrev = member.swiperWrap.find('.btn_prev');
		member.buttonNext = member.swiperWrap.find('.btn_next');
	};

	method.setOptions = function(){
		option.swiperListLength = member.swiperList.length;
		option.moveLeft = member.swiperList.width();
		option.autoStart = setInterval(function(){
									member.scrollWrap.stop(true,true).animate({
										'left' : - option.moveLeft
									},function(){
										method.swiperLeftChangeFunc();
										member.scrollWrap.css('left',0);
									});
								},2000);
	};

	method.bindEvents = function(){
		member.buttonPrev.on('click', $.proxy(method.swiperMoveLeftFunc,this));
		member.buttonNext.on('click', $.proxy(method.swiperMoveRightFunc,this));
	};

	method.autoPlayFunc = function(e){
		option.autoStart = setInterval(function(){
									member.scrollWrap.stop(true,true).animate({
										'left' : - option.moveLeft
									},function(){
										method.swiperLeftChangeFunc();
										member.scrollWrap.css('left',0);
									});
								},2000);
		member.buttonPrev.on('click', $.proxy(method.swiperMoveLeftFunc,this));
		member.buttonNext.on('click', $.proxy(method.swiperMoveRightFunc,this));
	};

	method.autoStopFunc = function(){
		clearInterval(option.autoStart);
		option.autoStart = null;
		member.buttonPrev.off('click');
		member.buttonNext.off('click');
	};

	method.swiperLeftChangeFunc = function(){
		$('.pass_list_wrap .swiper-slide:first-child').insertAfter('.pass_list_wrap .swiper-slide:last-child');
	};

	method.swiperRightChangeFunc = function(){
		$('.pass_list_wrap .swiper-slide:last-child').insertBefore('.pass_list_wrap .swiper-slide:first-child');
	};

	method.swiperMoveLeftFunc = function(){
		method.autoStopFunc();
		member.scrollWrap.stop(true,true).animate({
			'left' : - option.moveLeft
		},function(){
			method.swiperLeftChangeFunc();
			member.scrollWrap.css('left',0);
			method.autoPlayFunc();
		});
	};

	method.swiperMoveRightFunc = function(){
		method.autoStopFunc();
		member.scrollWrap.css('left',- option.moveLeft);
		method.swiperRightChangeFunc();
		member.scrollWrap.stop(true,true).animate({
			'left' : 0
		},function(){
			method.autoPlayFunc();
		});
	};

	return {
		init : method.init
	}

}();

window.subFadeTab = function(){
	$('.sub6_notice_button_list a').on('mouseenter',function(){
		if(!$(this).hasClass('on')){
			var idx = $(this).parent('li').index();
			$('.sub6_notice_button_list a').removeClass('on');
			$(this).addClass('on');
			$('.sub6_notice_list > li').fadeOut().eq(idx).stop(true,true).fadeIn();
		}
	});
};

window.subTabSlider = function(){
	var method = {}
	var member = {}
	var option = {}

	method.init = function(){
		method.setElements();
		method.initLayout();
		method.setOptions();
		method.bindEvents();
	};

	method.setElements = function(){
		member.tabSliderWrap = $('.sub_slide_wrap');
		member.sliderWrap = member.tabSliderWrap.find('.swiper-container');
		member.buttonPrev = member.tabSliderWrap.find('.btn_prev');
		member.buttonNext = member.tabSliderWrap.find('.btn_next');
		member.tabWrap = member.tabSliderWrap.find('.slide_tab');
		member.tabList = member.tabWrap.find('li');
		member.buttonTab = member.tabWrap.find('a');
	};

	method.setOptions = function(){
		option.noneActiveLength = member.tabSliderWrap.find('.swiper-container.none_active:visible').length;
		console.log(option.noneActiveLength);
	};

	method.initLayout = function(){
		member.sliderWrap.each(function(){
			$(this).addClass('none_active');
		});
		var mySwiper = $('.swiper-container:visible').swiper({
			pagination: false,
			loop:true,
			slidesPerView: 3,
			initialSlide: -1,
			grabCursor: true
		});
		method.buttonBindFunc();
		$('.swiper-container:visible').removeClass('none_active');
	};

	method.bindEvents = function(){
		member.buttonTab.on('click', $.proxy(method.tabShowHideFunc,this));
	};

	method.tabShowHideFunc = function(e){
		e.preventDefault();
		var target = $(e.currentTarget);
		var idx = target.parent('li').index();
		target.parent('li').addClass('active').siblings('li').removeClass('active');
		target.parents('.sub_slide').find('.slide_box').removeClass('on').eq(idx).addClass('on');
		method.slideStartFunc();
	};

	method.slideStartFunc = function(){
		var mySwiper = $('.swiper-container.none_active:visible').swiper({
			pagination: false,
			loop:true,
			slidesPerView: 3,
			initialSlide: -1,
			grabCursor: true
		});
		$('.swiper-container:visible').removeClass('none_active');
		method.buttonBindFunc();
	};

	method.buttonBindFunc = function(){
		member.buttonPrev.off('click');
		member.buttonNext.off('click');
		member.buttonPrev.on('click', function(e){
			e.preventDefault()
			var swiper = $(this).siblings('.swiper-container').data('swiper');
			swiper.swipePrev();
		});
		 member.buttonNext.on('click', function(e){
			e.preventDefault()
			var swiper = $(this).siblings('.swiper-container').data('swiper');
			swiper.swipeNext();
		});
	};

	return {
		init : method.init
	};

}();

$(function(){
	if($('.nav_2depth').length){
		window.headNavgation.init();
	};
	if($('.quick_menu_wrap').length){
		window.quickMenuShowHide.init();
	}
	if($('.main').length){
		window.mainTabScroll();
		window.mainThumbImageSlider.init();
	};
	if($('.tab_scroll_wrap').length){
		window.subTabScroll();
	}
	if($('.member_list_wrap').length){
		window.memberListTab();
	};
	if($('.sub_nav_wrap dl').length){
		window.subNavigation.init();
	};
	if($('.sub_tab_wrap').length){
		window.subTabFunc();	
	};
	if($('.tab_tit_img').length){
		window.subImageTabScroll();
	};
	if($('.sub1_4').length){
		window.subTabSlider.init();
	}
	if($('.sub5').length){
		window.subPassSwiper.init();
	};
	if($('.sub6_notice_list').length){
		window.subFadeTab();
	};

	var historyMore = function(){
		var btnMore = $('.sub1_1 .history .btn_more');
        btnMore.on('click',function(e){
        	e.preventDefault();
        	if(!$(this).closest('dd').hasClass('active')){
                $(this).closest('dd').addClass('active');
                $(this).hide();
        	}
		});
	};
    historyMore();
});