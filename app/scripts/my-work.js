

// slideshow
function makeSlideshow(slideshowContainer){
  var slideshow = {
    container : $(slideshowContainer),
    items : [],
    middleSlide: 1,
    itemWidth: 0,
    itemMargin:0.1,
    animationInterval : 0,
    playSpeed: 1000,
    swapSpeed: 0.5,
    playing:false,

    initialize : function(){
      this.items = $(this.container).children();
      this.resizeItems();
    },
    resizeItems: function(){
      this.itemWidth = $(this.items[0]).innerWidth();
      var newItemMargin = this.itemMargin * this.itemWidth;

      for(var i = 0; i < this.items.length; i++){
        //TweenMax.set(this.items[i], {transformOrigin: "center bottom", left: -window.innerWidth*0.05 + i * $(this.items[i]).innerWidth()+"px" });
        TweenMax.set(this.items[i], {
          scale:0.7,
          height:$(this.container).parent().innerHeight() + 'px',
          transformOrigin: "center bottom",
          //left: i * this.itemWidth - i*newItemMargin - this.itemWidth*0.2 +"px",
          left: i * this.itemWidth - i*newItemMargin - this.itemWidth*0.2 +"px",
          top:0
        });
        this.middleSlide = 1;
        TweenMax.set(this.items[this.middleSlide], {scale:1});
      }
    },
    autoPlay : function(){
      this.animationInterval = window.setInterval(function(){
        this.play(1);
      }.bind(this), this.playSpeed);
    },
    play:function(dir){
        // get next item
        if(dir === 1){
          if(this.middleSlide+1 < this.items.length){
            animateNext(dir, this);
          }else{
            animateBump(dir, this);
          }
        }else if(dir === -1){
          if(this.middleSlide > 0){
            animateNext(dir, this);
          }else{
            animateBump(dir, this);
          }
        }

        function setParentPlaying(parent, trueOrFalse){
            parent.playing = trueOrFalse;
        }

        function animateNext(dir, parent){
          if(!parent.playing){
            setParentPlaying(parent, true);
            for(var i = 0; i < parent.items.length; i++){
              TweenMax.to(parent.items[i], parent.swapSpeed, {top:-50, scale:0.7, left:'+=' + ((dir*-1) * (parent.itemWidth - parent.itemMargin*parent.itemWidth)) + 'px'})
            }
            parent.middleSlide += 1*dir;
            TweenMax.to(parent.items[parent.middleSlide], parent.swapSpeed, {top:0, scale:1, onComplete:setParentPlaying, onCompleteParams:[parent, false]})
          }
        }

        function animateBump(dir, parent){
          if(!parent.playing){
            setParentPlaying(parent, true);
            for(var i = 0; i < parent.items.length; i++){
              TweenMax.to(parent.items[i], parent.swapSpeed*0.5, {top:-50, scale:0.7, left:'+=' + ((dir*-1) * (parent.itemWidth *0.5)) + 'px'})
              TweenMax.to(parent.items[i], parent.swapSpeed, {top:-50, scale:0.7, left:'-=' + ((dir*-1) * (parent.itemWidth *0.5)) + 'px', delay: parent.swapSpeed*0.5, ease: Bounce.easeOut})
            }
            TweenMax.to(parent.items[parent.middleSlide], parent.swapSpeed, {top:0, scale:1, delay: parent.swapSpeed*0.5, ease: Bounce.easeOut, onComplete:setParentPlaying, onCompleteParams:[parent, false]})
          }
        }
    },
    stopAutoplay : function(){
      window.clearInterval(this.animationInterval);
    }
  }
  return slideshow;
}

window.onresize = function(){
  projectsSlideshow.resizeItems();
}

var projectsSlideshow = new makeSlideshow('#slideshow #items');
    projectsSlideshow.initialize();


    $(window).scroll(function(){
      if($('#my-work').isOnScreen(0.5, 0.5)){
        myWorkTimeline.play();
      };
    })


    // animations

    var myWorkTitle = $('#my-work h2 span');
    var slideshowItems = $('#slideshow .item')
    var slideshowButtons = $('#slideshow .slideshow-button');

    var myWorkTimeline = new TimelineMax({paused:true})
        .from(myWorkTitle, 1, {top:-300, autoAlpha:0, ease:Bounce.easeOut})
        .staggerFrom(slideshowItems, 1, {y:-300, autoAlpha:0, ease:Bounce.easeOut, onComplete:projectsSlideshow.autoPlay}, 0.2);

    document.getElementById("backward-button").addEventListener("click", function(){projectsSlideshow.play(-1)});
    document.getElementById("forward-button").addEventListener("click", function(){projectsSlideshow.play(1)});
