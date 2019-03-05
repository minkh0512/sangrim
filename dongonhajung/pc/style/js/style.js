$(function(){
	var categoryNav = function(){
		$('.btn_category').on('click',function(e){
			e.preventDefault()
			if($(this).hasClass('active')){
                $(this).removeClass('active');
            }else{
                $(this).addClass('active');
			}
		})
	};
    categoryNav();

    var imageZoom = function(){
		$('.product_item_list .img_box img').on('mouseenter',function(){
			console.log(1);
			$(this).addClass('active').removeClass('noraml');
		});
        $('.product_item_list .img_box img').on('mouseleave',function(){
            $(this).removeClass('active').addClass('normal');
        });
	};
    imageZoom();

    var storyAcodian = function(){
    	$('.acodian_story dt a').on('click',function(e){
    		e.preventDefault();
    		if($(this).parent('dt').hasClass('active')){
    			$(this).parent('dt').next().slideUp();
    			$(this).parent('dt').removeClass('active');
    		}else{
    			$(this).parent('dt').next().stop(true,true).slideDown();
    			$(this).parent('dt').addClass('active');
    		}
    		
    	});
    };
    storyAcodian();
});