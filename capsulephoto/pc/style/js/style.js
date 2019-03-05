window.mainNavFunc = function(){
	$('.main_nav li').eq(2).find('> a').on('click',function(){
		console.log(1);
		$(this).parent('li').addClass('active');
	});
};

window.subGalleryTabFunc = function(){
	$('.tab a').on('click',function(e){
		e.preventDefault();
		if(!$(this).parent('li').hasClass('active')){
			$('.tab li').removeClass('active');
			$(this).parent('li').addClass('active')
			$('.tab_cont').removeClass('active');
			$('.tab_cont').eq($(this).parent('li').index()).addClass('active');
		}
	});
};

window.subGalleryLayerFunc = function(){
	$('.gallery_list a').on('click',function(e){
		e.preventDefault();
		$('.cart_layer_wrap').show();
	});
	$('.cart_layer_wrap .btn_close').on('click',function(e){
		e.preventDefault();
		$('.cart_layer_wrap').hide();
	});
};
