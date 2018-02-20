SWGame ={ 
  gameMusicPlayer:document.getElementById("MusicToggle"), 
  gameSFXPlayer:document.getElementById("SFX"),
  gameMusic:$("#MusicToggle"),
  gameSFX:$("#SFX"),
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

    SWGame.arrHerosChoosen.length=0;
    this.setGameState("Splash");    
  },
  setGameState: function (inState){  
    this.gameState = inState;
    $(".main-content").hide();    
    switch(inState){
      case "Splash":
       $("#Splash").show();
       $("#SplashSelect").show();
       
       this.gameMusic.attr("src","./assets/sounds/STheme.mp3");
       $("body").css("backgroundImage","url('./assets/images/StarWarsPoster.jpg')");
       break;       
      case "Run":
       $("#Run").show();
       this.gameMusic.attr("src","./assets/sounds/SWfight.mp3");
       $("#MyHero").attr("src",SWGame.Hero.hPic);
       $("#HeroStory").text(SWGame.Hero.hText);
       $(document.body).css("backgroundImage","url('./assets/images/DeathStar.jpg')");
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
    arrhSoundBite: ["./assets/sounds/Luke.mp3","./assets/sounds/Leia.mp3","./assets/sounds/Han.mp3","./assets/sounds/C3PO.mp3","./assets/sounds/R2D2.mp3","./assets/sounds/Chewie.mp3"],
    arrhFlavorText: ["After the celebrations on Yavin IV, Luke was sent on diplomatic missions to gain the help of outter rim warlords, gangsters and near do wells to find more willing soldiers and resources.  Little was he aware that he was being followed.","Leia was taken under the wing of the Rebel leader Mon Motha as a promising new commander. However, on a routine inspection mission their ship crashed landed on what they believed was an abandoned moon.  Unknown to them this would prove to be the fight of Leia’s life!" ,"Han was off to Tatooine. It was long overdue, he had to make payments to the Hutt's or he wouldn't be the pilot of the Falcon for much longer, heck he wouldn't be alive much longer.", "C3-PO incompetent lacky of R2 has gotten himself in a pickle not 3 minutes after R2 left on some foolish errand. Enrolling in a local rebellion coding bootcamp, he believes it's his last hope to quell the evaporator rebellion simmering on Tatooine.","R2-D2 leader of the Rebellion, has taken it upon himself to destroy the emperors newest evil battle station. R2 realizes that while everyone else stands around being useless, only he  can truly save the galaxy... Luke.. pfft...", "Chewie was seperated from Han after the battle on Yavin, it was time for him to return to his homeworld due to recent familiar events that portend of bad omens."],
    arrhHP: ["200","75","150","60","70","180"],
    arrhDMG: ["20","10","15","7","15","18"],
    hName:"",
    hPic:"",    
    hSound:"",
    hText:"",
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
      SWGame.gameSFX.attr("src",myHero.hSound);
      SWGame.gameSFXPlayer.play();  
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
      myHero.hSound = myHero.arrhSoundBite[i];
      myHero.DMG = myHero.arrhDMG[i];
      myHero.hText = myHero.arrhFlavorText[i];
      return myHero;
    }
  }
  
}
$(document).ready(function () {  
  SWGame.reset();
});