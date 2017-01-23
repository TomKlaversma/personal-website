
var folderPrefix = 'projects';

function openIframe(link) {
  $('iframe').attr('src', folderPrefix + '/' + link);
}

// close the popup
$('#popup:not(iframe)').click(function(event) {
  $('body').css('overflow', 'auto');
  TweenMax.to('#popup', 0.4, {autoAlpha: 0});
});

$('.item').click(function(event) {
  $('body').css('overflow', 'hidden');
  TweenMax.to('#popup', 0.4, {autoAlpha: 1});
  TweenMax.fromTo('iframe', 0.6, {scale: 0.5, ease: Power2.easeIn}, {scale: 1, ease: Back.easeOut});
  openIframe($(this).attr('data-link'));
});
