// fix titles for animations

var titles = document.querySelectorAll('span.animation');
function resizeTextholders(){
  for(var i = 0; i < titles.length; i++){
    titles[i].parentNode.style.height = titles[i].offsetHeight+ 'px';
  }
}

resizeTextholders();

window.onresize = function(){
  resizeTextholders();
}
