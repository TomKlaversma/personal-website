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
  });

  $("contact-form").ajaxSubmit({
    url: 'server.php',
    type: 'post'
  }).done(function() {
      TweenMax.to('#done-message', 0.5, {autoAlpha: 1}
  });
});

function getWidthOfInput(inputEl) {
  var tmp = document.createElement("span");
  tmp.className = "input-element tmp-element";
  tmp.innerHTML = inputEl.value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  document.body.appendChild(tmp);
  var theWidth = tmp.getBoundingClientRect().width;
  document.body.removeChild(tmp);
  return theWidth;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
