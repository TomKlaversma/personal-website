
// animations

var myWorkTitle = $('#my-work h2 span');
var slideshowItems = $('#slideshow .item')

var myWorkTimeline = new TimelineMax({paused:true})
    .from(myWorkTitle, 1, {top:-300, autoAlpha:0, ease:Bounce.easeOut})
    .staggerFrom(slideshowItems, 1, {y:-300, autoAlpha:0, ease:Bounce.easeOut}, 0.2);

 $(window).scroll(function(){
  if($('#my-work').isOnScreen(0.5, 0.5)){
    myWorkTimeline.play();
  };
})

// slideshow
function makeSlideshow(slideshowContainer){
  var slideshow = {
    container : $(slideshowContainer),
    items : [],
    itemsVisible: [0,1,2],
    animationInterval : 0,
    playSpeed: 6000,

    initialize : function(){
      this.items = $(this.container).children();
      this.resizeItems();
      this.autoPlay();
    },
    resizeItems: function(){
      for(var i = 0; i < this.items.length; i++){
        //TweenMax.set(this.items[i], {transformOrigin: "center bottom", left: -window.innerWidth*0.05 + i * $(this.items[i]).innerWidth()+"px" });
        TweenMax.set(this.items[i], {
          scale:0.7,
          height:$(this.container).parent().innerHeight() + 'px',
          transformOrigin: "center bottom",
          left: i * $(this.items[i]).innerWidth() - i*$(this.items[i]).innerWidth()*0.1 - $(this.items[i]).innerWidth()*0.2 +"px"
        });
        TweenMax.set(this.items[this.itemsVisible[1]], {scale:1});
      }
    },
    autoPlay : function(){
      this.animationInterval = window.setInterval(function(){
        this.forward();
      }.bind(this), this.playSpeed);
    },
    forward:function(){
      // calculate next slide

      // do animation

      // set to next position

    }
  }
  return slideshow;
}

window.onresize = function(){
  projectsSlideshow.resizeItems();
}


var projectsSlideshow = new makeSlideshow('#slideshow #items');
    projectsSlideshow.initialize();
