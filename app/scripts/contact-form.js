
// do for each input
$(document).ready(function(){
  $('input').keypress(function(){
    $(this).css({
      width : getWidthOfInput(this)*1.18 +40+ 'px'
    })
  });
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
