
// animations

var myWorkTitle = $('#my-work h2 span');
var myWorkTimeline = new TimelineMax({paused:true})
    .from(myWorkTitle, 1, {top:-300, autoAlpha:0, ease:Bounce.easeOut})
    .from('#slideshow', 1, {autoAlpha:0})

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
    slidesVisible: [0,1,2],
    animationInterval : 0,
    playSpeed: 6000,

    initialize : function(){
      this.items = $(this.container).children();

      // set all items in correct position

      TweenMax.set([this.items[0], this.items[2]], {scale:0.7, y:-40});

      for(var i = 0; i < this.items.length; i++){
        TweenMax.set(this.items[i], {transformOrigin: "center bottom", left: -window.innerWidth*0.05 + i * $(this.items[i]).innerWidth()+"px" });
      }

      //this.autoPlay();
      //TweenMax.set(this.items[i], {autoAlpha:0});
    },
    resizeItems: function(){
      for(var i=0; i < this.items.length; i++){
        TweenMax.set(this.items[i], {left: -window.innerWidth*0.05 + i * $(this.items[i]).innerWidth()+"px" })
      }
    },
    autoPlay : function(){
      this.animationInterval = window.setInterval(function(){
        // calculate next slide
        var nextItem = this.currentPos;

        if(this.currentPos === this.items.length-1){
          nextItem = 0;
        }else{
          nextItem += 1;
        }

        // do animation
        console.log(this.currentPos, nextItem);

        // set to next position
        if(this.currentPos < this.items.length-1){
          this.currentPos += 1;
        }else{
          this.currentPos = 0;
        }

      }.bind(this), this.playSpeed);
    }
  }

  return slideshow;
}

window.onresize = function(){
  projectsSlideshow.resizeItems();
}


var projectsSlideshow = new makeSlideshow('#slideshow');
    projectsSlideshow.initialize();
