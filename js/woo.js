$(document).ready(function(){
    //首先将#back-to-top隐藏
    $("#totop").hide();

});

$(window).scroll(function(){
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    if ($(window).scrollTop()>100){
        $("#totop").fadeIn();
    }
    else
    {
        $("#totop").fadeOut();
    }
});
//当点击跳转链接后，回到页面顶部位置
$("#totop").click(function(){
    $('body,html').animate({scrollTop:0},500);
    return false;
});
