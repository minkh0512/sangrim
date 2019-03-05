$(function(){
	var headHeight = $('#header').height();

	var screeingTab = function(){
		$('.screening_tab a').on('click',function(e){
			e.preventDefault();
			if(!$(this).parent('li').hasClass('active')){
				var idx = $(this).parent('li').index();
				$('.screening_tab li').removeClass('active');
				$(this).parent('li').addClass('active');
				$('.tab_cont_wrap .tab_cont').hide().eq(idx).show();
			}
		});
	};
	if($('.screening_tab_wrap').length){
		screeingTab();
	};

	var scrollTab = function(){
		var scrollTopPostion;
		$('.scroll_tab a').on('click',function(e){
			console.log(headHeight);
			e.preventDefault();
			var idx = $(this).parent('li').index();
			var scTop = $('.scroll_tab').eq(idx).offset().top;
			scrollTopPostion = scTop - headHeight;
			$('html, body').animate({'scrollTop' : scrollTopPostion}, 500);
		});
	};
	if($('.scroll_tab').length){
		scrollTab();
	};

	var scrollTab2 = function(){
		var scrollTopPostion;
		$('.tab_list a').on('click',function(e){
			console.log(headHeight);
			e.preventDefault();
			var idx = $(this).parent('li').index();
			var scTop = $('.tab_list').eq(idx).offset().top;
			scrollTopPostion = scTop - headHeight + 1;
			$('html, body').animate({'scrollTop' : scrollTopPostion}, 500);
		});
	};
	if($('.tab_list').length){
		scrollTab2();
	};

	var scrollTab3 = function(){
		var scrollTopPostion;
		$('.ctb_list a').on('click',function(e){
			console.log(headHeight);
			e.preventDefault();
			var idx = $(this).parent('li').index();
			var scTop = $('.color_tab_box').eq(idx).offset().top;
			scrollTopPostion = scTop - headHeight + 1;
			$('html, body').animate({'scrollTop' : scrollTopPostion}, 500);
		});
	};
	if($('.color_tab_wrap').length){
		scrollTab3();
	};
});