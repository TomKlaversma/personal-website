// fix titles for animations

var titles = $('span.animation');
$(titles).parent().css({height:$(titles).outerHeight()})

window.onresize = function(){
  $(titles).parent().css({height:$(titles).outerHeight()});
}
