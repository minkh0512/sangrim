$(function(){
	$('#header .btn_menu').on('click',function(e){
		e.preventDefault();
		$('.gnb_wrap').addClass('active');
	});
	$('.gnb_wrap .btn_close').on('click',function(){
		$('.gnb_wrap').removeClass('active');
	});
	$('.gnb_wrap .dimmed').on('click',function(){
		$('.gnb_wrap').removeClass('active');
	});
});