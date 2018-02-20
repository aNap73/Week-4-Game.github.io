SWGame ={ 
  gameMusicPlayer:document.getElementById("MusicToggle"), 
  gameMusic:$("#MusicToggle"),
  bGameMusicOn: true,
  mToggle: function () {
    
    if(SWGame.bGameMusicOn){
      $("#MusicLabel").text("Music: Off");
      this.gameMusicPlayer.pause();
    }else{
      this.gameMusicPlayer.play();
      $("#MusicLabel").text("Music: On");
    }
    SWGame.bGameMusicOn = (!SWGame.bGameMusicOn);
  },  
  gameState:"Splash",
  arrHerosChoosen: [],
  reset: function (){
    SWGame.arrHerosChoosen.length=0;
    this.setGameState("Splash");    
  },
  setGameState: function (inState){  
    this.gameState = inState;
    $(".main-content").hide();    
    switch(inState){
      case "Splash":
       $("#Splash").show();
       this.gameMusic.attr("src","./assets/sounds/STheme.mp3");
       break;
      case "Run":
       $("#Run").show();
       this.gameMusic.attr("src","./assets/sounds/SWfight.mp3");
       break;
      case "Over":
       $("#Over").show();       
       this.gameMusic.attr("src","./assets/sounds/Lose.mp3");
       break;
    }
  },  
  Hero:{
    arrhName:["Luke","Leia","Han","C3-PO","R2-D2","Chewie"],
    arrhPic: ["./assets/images/Luke.png","./assets/images/Leia.png","./assets/images/Han.png","./assets/images/C3.png","./assets/images/R2.png","./assets/images/Chewie.png"],
    arrhHP: ["200","75","150","60","70","180"],
    arrhDMG: ["20","10","15","7","15","18"],
    hName:"",
    hPic:"",    
    hHP: 0,
    hDMG: 0,    
    getRandomHero: function(myHero)
    {
      var myrnd = Math.floor((Math.random()*6));
      while(SWGame.arrHerosChoosen.includes(myrnd)){
        myrnd = Math.floor((Math.random()*6)); 
      } 
      SWGame.arrHerosChoosen.push(myrnd);

      
      myHero = myHero.setHero(myHero, myrnd);
      return myHero;
    },
    clickMyHero: function(myHero, inElement){
      myHero = myHero.setMyHero(myHero,inElement.name);
      SWGame.setGameState("Run");
      return myHero;
    }, 
    setMyHero: function(myHero, myHerosName)
    {
      
      myHero = myHero.setHero(myHero, myHero.arrhName.indexOf(myHerosName));
    
      return myHero;
    },
    setHero: function(myHero, i)
    {
      myHero.hName = myHero.arrhName[i];
      myHero.hPic = myHero.arrhPic[i];
      myHero.hHP = myHero.arrhHP[i];
      myHero.DMG = myHero.arrhDMG[i];
      return myHero;
    }
  }
  
}
$(document).ready(function () {
  
  SWGame.reset();
  SWGame.Hero.getRandomHero(SWGame.Hero);
  var MyHero1Pic = SWGame.Hero.hPic;
  var MyHero1Name = SWGame.Hero.hName;

  SWGame.Hero.getRandomHero(SWGame.Hero);
  var MyHero2Pic = SWGame.Hero.hPic;
  var MyHero2Name = SWGame.Hero.hName;

  SWGame.Hero.getRandomHero(SWGame.Hero);
  var MyHero3Pic = SWGame.Hero.hPic;
  var MyHero3Name = SWGame.Hero.hName;

  $("#Hero1").attr("src",MyHero1Pic);
  $("#Hero2").attr("src",MyHero2Pic);
  $("#Hero3").attr("src",MyHero3Pic);

  $("#Hero1").attr("name", MyHero1Name);
  $("#Hero2").attr("name", MyHero2Name);
  $("#Hero3").attr("name", MyHero3Name);
  $(".portrait").on('click',function () {
    SWGame.Hero.clickMyHero(SWGame.Hero,this);
    });
    


  
});