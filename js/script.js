(function($){

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + $(this).attr('src') + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  //Remove search input icon
  $('input[type=search]').removeAttr('results');

  function startWindowAnim(){
    $('#header').addClass('open mdl-shadow--2dp');
    $('#wrap > .outer').addClass('open');
    $('#footer').addClass('open');
  }

  //Set image scrollLoading
  $('.article-entry img').each(function() {
    $(this).attr('data-url', $(this).attr('src'));
    $(this).removeAttr('src');
    $(this).addClass('scrollLoading');
    $(this).wrap('<div class="img-wrap"></div>');
  });

  var imgCount,
      timer = setInterval(function () {
        if(imgCount <= 0)
          clearInterval(timer);
        isLoaded();
      }, 500);

  var isLoaded = function () {
    $('.scrollLoading').each(function (i, img) {
      if($(this).height() > 0 && $(this).parents('.img-wrap').length) {
        if($(this).parent().hasClass('img-wrap'))
          $(this).unwrap();
        else
          $(this).parent().unwrap();
      }
    });
    imgCount = $('.img-wrap').length;
  }

  $('.scrollLoading').scrollLoading();

  setTimeout(startWindowAnim, 1);

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  //Open search box
  $('#nav-search-btn').on('click', function(){
    $('#search-form-wrap').toggleClass('on');
    $('#main-nav').toggleClass('off');
  });
  //When click other element. close search box
  $("#wrap > .outer").on('click', function(){
    $('#search-form-wrap').removeClass('on');
    $('#main-nav').removeClass('off');
  });

  // Mobile nav
  $('#main-nav-toggle').on('click', function(){
    $('#mobile-nav').toggleClass('off');
  });

})(jQuery);
//scroll

// $(function () {
//   var ie6 = document.all;
//   var dv = $('#sidebar'), st;
//   dv.attr('top',dv.offset().top);
//   dv.attr('otop', dv.offset().top + dv.outerHeight(true) - $(window).height() ); //存储原来的距离顶部的距离
//   $(window).scroll(function () {
//     st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
//     if (st > parseInt(dv.attr('otop'))) {
//       if (ie6) {//IE6不支持fixed属性，所以只能靠设置position为absolute和top实现此效果
//        dv.css({ position: 'absolute', top: st });
//       }
//       else if (dv.css('position') != 'fixed') dv.css({ 'position': 'fixed', top: dv.attr('top')-dv.attr('otop') });
//     } else if (dv.css('position') != 'static') dv.css({ 'position': 'static' });
//   });
// });
