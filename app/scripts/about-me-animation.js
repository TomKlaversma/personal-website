'use strict';

function MakeWordSwitcher(domElement){
  var wordList = {
    speed: 3000,
    domElement: domElement,
    currentWord: 0,
    words: [],
    animationInterval: '',
    initialize: function(){
      var wordList = $(this.domElement).children();
      var wordListParent = $(this.domElement).parent();

      $(wordListParent).css({
        height : $(wordList).innerHeight() + 'px'
      })

      for(var i = 0; i < wordList.length; i++){
        this.words.push($(wordList[i]));
        $(this.words[i]).css({
          'position': 'absolute',
          'top': 0
        })
        TweenMax.set(this.words[i], {left:300, autoAlpha:0, ease:Power2.easeOut})
      }
    },
    startAnimation:function(parent){
      TweenMax.fromTo(parent.words[parent.currentWord], 1,{rotation:-30, left:500, autoAlpha:0}, {rotation:0, left:0, autoAlpha:1, ease:Back.easeOut.config(3)})
      parent.animationInterval = window.setInterval(function(){
        var nextWord = parent.currentWord;
        if(parent.currentWord === parent.words.length-1){
          nextWord = 0;
        }else{
          nextWord += 1;
        }

        TweenMax.to(parent.words[parent.currentWord], 0.3, {left:-300, autoAlpha:0, ease:Power2.easeOut, delay:0.1})
        TweenMax.fromTo(parent.words[nextWord], 1,{rotation:-30, left:500, autoAlpha:0}, {rotation:0, left:0, autoAlpha:1, ease:Back.easeOut.config(3)})

        if(parent.currentWord < parent.words.length-1){
          parent.currentWord += 1;
        }else{
          parent.currentWord = 0;
        }

      }, parent.speed);
    }
  }
  wordList.initialize();
  return wordList;
}

var aboutMeSwitcher = new MakeWordSwitcher('#word-list');
var myName = $('#about-me h2 span');
var myDescription = $('#about-me p span');

$('.profile-picture').css({position:'absolute'});

var homeAnimation = new TimelineMax()
    .from(myName, 1, {top:-400, autoAlpha:0, ease:Bounce.easeOut, delay:2, onComplete:aboutMeSwitcher.startAnimation, onCompleteParams:[aboutMeSwitcher]}, 0)
    .from('.profile-picture', 1, {top:900, ease:Power4.easeOut}, 0.5)
    .from(myDescription, 3, {autoAlpha:0}, 4);
