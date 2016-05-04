
function MakeWordSwitcher(domElement){
  var wordList = {
    speed : 3000,
    domElement : domElement,
    currentWord: 0,
    words:[],
    animationInterval:"",
    initialize:function(){
      var wordList = $(this.domElement).children();
      for(var i = 0; i < wordList.length; i++){
        this.words.push($(wordList[i]));
        if(i > 0){
          $(wordList[i]).hide();
        }
      }
      this.startAnimation();
    },
    startAnimation:function(){
      this.animationInterval = window.setInterval(function(){
        var nextWord = this.currentWord;
        for(var i=0; i < this.words.length; i++){
          $(this.words[i]).hide();
        }
        if(this.currentWord === this.words.length){
          nextWord = 0;
        }
        $(this.words[this.currentWord]).hide();
        $(this.words[nextWord]).show();

        if(this.currentWord < this.words.length-1){
          this.currentWord += 1;
          $(this.words[this.currentWord]).hide();
        }else{
          this.currentWord = 0;
          $(this.words[this.currentWord]).hide();
        }

      }.bind(this), this.speed);
    }
  }
  return wordList;
}

var beginSwitcher = new MakeWordSwitcher('#word-list');
    beginSwitcher.initialize();
