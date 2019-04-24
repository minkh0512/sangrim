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
        member.navInnerWrap = $('.gnb_wrap_inner');
        member.navBackground = $('.gnb_bg');
        member.navDepth1 = $('.nav_gnb');
        member.navDepth2 = $('.nav_2depth');
        member.btnDepth1 = $('.btn_depth1');
        member.btnDepth2 = $('.btn_depth2');
        member.banner = member.navWrap.find('.btn_banner');
    };

    method.initLayout = function(){
        member.navDepth2.hide();
        member.navBackground.hide();
        member.banner.hide();
    };

    method.bindEvents = function(){
        member.btnDepth1.on('mouseenter', $.proxy(method.navShowFunc,this));
        member.btnDepth2.on('mouseenter', $.proxy(method.mouseHoverFunc,this));
        member.navInnerWrap.on('mouseleave', $.proxy(method.navHideFunc,this))
    };

    method.navShowFunc = function(){
        member.navWrap.addClass('active');
        member.navBackground.slideDown(200);
        member.navDepth2.slideDown(200);
        member.banner.show();
    };

    method.navHideFunc = function(){
        member.navWrap.removeClass('active');
        member.navBackground.stop(true,true).slideUp(100);
        member.navDepth2.stop(true,true).hide();
        member.navDepth1.find('.nav_list').removeClass('on');
        member.banner.hide();
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

$(function(){
    if($('.nav_2depth').length){
        window.headNavgation.init();
    };

    $('.btn_q').click(function(e){
        e.preventDefault();
        if( !$(this).parent().hasClass('active') ){
            $(this).parent().addClass('active')
        }else{
            $(this).parent().removeClass('active')
        }
    });
})