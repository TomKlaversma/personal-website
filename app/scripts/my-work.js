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
        TweenMax.set(this.items[i], {
          scale:0.7,
          height:$(this.container).parent().innerHeight() + 'px',
          transformOrigin: "center bottom",
          left: i * this.itemWidth - i*newItemMargin - this.itemWidth*0.2 +"px",
          top:-50,
          backgroundColor:'#efefef'
        });

        TweenMax.set($(this.items[i]).find('.lint'), {
          autoAlpha:0
        });

        this.middleSlide = 1;
        TweenMax.set(this.items[this.middleSlide], {scale:1, top:0, backgroundColor:'#028398'});
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
              TweenMax.to(parent.items[i], parent.swapSpeed, {top:-50, scale:0.7, backgroundColor:'#efefef', left:'+=' + ((dir*-1) * (parent.itemWidth - parent.itemMargin*parent.itemWidth)) + 'px'})
            }
            parent.middleSlide += 1*dir;
            TweenMax.to(parent.items[parent.middleSlide], parent.swapSpeed, {top:0, scale:1, backgroundColor:'#028398', onComplete:setParentPlaying, onCompleteParams:[parent, false]})
            TweenMax.fromTo($(parent.items[parent.middleSlide]).find('.lint'), parent.swapSpeed,
              {autoAlpha:0, y:10, x:-40, width:0},
              {autoAlpha:1, y:0, x:-20, width:20, delay: swapSpeed*2, ease: Power3.easeOut}
            );
          }
        }

        function animateBump(dir, parent){
          if(!parent.playing){
            setParentPlaying(parent, true);
            for(var i = 0; i < parent.items.length; i++){
              TweenMax.to(parent.items[i], parent.swapSpeed*0.5, {top:-50, scale:0.7, left:'+=' + ((dir*-1) * (parent.itemWidth *0.4)) + 'px'})
              TweenMax.to(parent.items[i], parent.swapSpeed, {top:-50, scale:0.7, left:'-=' + ((dir*-1) * (parent.itemWidth *0.4)) + 'px', delay: parent.swapSpeed*0.5, ease: Bounce.easeOut})
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



var projectsSlideshow = new makeSlideshow('#slideshow #items');
    projectsSlideshow.initialize();

    $(window).scroll(function(){
      if($('#my-work').isOnScreen(0.5, 0.5)){
        myWorkTimeline.play();
      };
    })

    window.onresize = function(){
      projectsSlideshow.resizeItems();
    }

    // animations

    var myWorkTitle = $('#my-work h2 span');
    var slideshowItems = $('#slideshow .item')
    var slideshowButtons = $('#slideshow .slideshow-button');

    TweenMax.set($(slideshowItems[1]).find('.lint'), {autoAlpha:1});

    var myWorkTimeline = new TimelineMax({paused:true})
        .from(myWorkTitle, 1, {top:-300, autoAlpha:0, ease:Bounce.easeOut})
        .staggerFrom(slideshowItems, 1, {y:-300, autoAlpha:0, ease:Bounce.easeOut, onComplete:projectsSlideshow.autoPlay}, 0.2)
        .from($(slideshowItems[1]).find('.lint'), 0.5, {autoAlpha:0, y:10, x:-40, width:0, ease: Power3.easeOut}, 2);

    document.getElementById("backward-button").addEventListener("click", function(){projectsSlideshow.play(-1)});
    document.getElementById("forward-button").addEventListener("click", function(){projectsSlideshow.play(1)});
