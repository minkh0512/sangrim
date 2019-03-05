$(function(){
	$('.header_wrap .btn_menu').on('click',function(){
		$('.left_nav_wrap').addClass('active');
		$('.left_nav_dimmed').fadeIn(500);
	});
	$('.left_nav_wrap .btn_close').on('click',function(){
		$('.left_nav_wrap').removeClass('active');
		$('.left_nav_dimmed').fadeOut(300);
	});
	$('.left_nav_dimmed').on('click',function(){
		$('.left_nav_wrap').removeClass('active');
		$('.left_nav_dimmed').fadeOut(300);
	});
	$('.buy_layer_wrap .btn_close').on('click',function(){
		$('.buy_layer_wrap').hide();
	});
});