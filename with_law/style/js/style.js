$(function(){
	var btn_quick = $('.quick_menu_wrap .btn_open');
	btn_quick.on('click',function(e){
		e.preventDefault();
		if($(this).hasClass('on')){
			$('.quick_menu_wrap').animate({
				'right' : 0
			},500);
			$(this).removeClass('on');
		}else{
			$('.quick_menu_wrap').animate({
				'right' : -136 
			},500);
			$(this).addClass('on');
		}
	});

	var scroll_top1 = $('#scroll_move1').offset().top;
	var scroll_top2 = $('#scroll_move2').offset().top;
	var scroll_top3 = $('#scroll_move3').offset().top;
	$('.scroll_list li').eq(0).find('a').on('click',function(e){
		e.preventDefault();
		console.log(1);
		$('html, body').animate({
			'scrollTop' : scroll_top1 + 1
		}, 300);
	});
	$('.scroll_list li').eq(1).find('a').on('click',function(e){
		e.preventDefault();
		$('html, body').animate({
			'scrollTop' : scroll_top2 + 1
		}, 300);
	});
	$('.scroll_list li').eq(2).find('a').on('click',function(e){
		e.preventDefault();
		$('html, body').animate({
			'scrollTop' : scroll_top3 + 1
		}, 300);
	});

	var section2_offset = $('.section2').offset().top;
	var section3_offset = $('.section3').offset().top;
	var section4_offset = $('.section4').offset().top;
	var section5_offset = $('.section5').offset().top;
	var section6_offset = $('.section6').offset().top;
	$(window).on('scroll',function(){
		if($(this).scrollTop() > section2_offset && $(this).scrollTop() < section3_offset){
			$('.bottom_fixed_wrap a').hide();
			$('.bottom_fixed_wrap a').eq(0).show();
		}else if($(this).scrollTop() > section4_offset && $(this).scrollTop() < section5_offset){
			$('.bottom_fixed_wrap a').hide();
			$('.bottom_fixed_wrap a').eq(1).show();
		}else if($(this).scrollTop() > section5_offset && $(this).scrollTop() < section6_offset){
			$('.bottom_fixed_wrap a').hide();
			$('.bottom_fixed_wrap a').eq(2).show();
		}else{
			$('.bottom_fixed_wrap a').hide();
		}
	});
});