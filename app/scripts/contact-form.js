//
// // do for each input
$(document).ready(function(){
  $('input').keyup(function(){
    if($(this).val().length > 0){
      TweenMax.to(this, 0.2, {width: getWidthOfInput(this)*1.18 +40+ 'px'});
    }else{
      TweenMax.to(this, 0.2, {width: '156px'});
    }
  });

  $('textarea').keyup(function(){
    if($(this).val().length > 0){
      TweenMax.to(this, 0.6, {backgroundColor: '#fff'});
    }else{
      TweenMax.to(this, 0.6, {backgroundColor: '#efefef'});
    }
  })
})
function getWidthOfInput(inputEl) {
  var tmp = document.createElement("span");
  tmp.className = "input-element tmp-element";
  tmp.innerHTML = inputEl.value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  document.body.appendChild(tmp);
  var theWidth = tmp.getBoundingClientRect().width;
  document.body.removeChild(tmp);
  return theWidth;
}
