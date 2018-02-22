SWGame ={
  bPlayerWon: false,
  bOnLoad: true,
  bInFight: false,
  gameMusicPlayer:document.getElementById("MusicToggle"), 
  gameSFXPlayer:document.getElementById("SFX"),
  gameMusic:$("#MusicToggle"),
  gameSFX:$("#SFX"),
  bGameMusicOn: true,
  mToggle: function () {    
    if(SWGame.bGameMusicOn){
      $("#mnu2").attr("src","./assets/images/MusicOff.png");
      this.gameMusicPlayer.pause();
    }else{
      this.gameMusicPlayer.play();
      $("#mnu2").attr("src","./assets/images/MusicOn.png");
    }
    SWGame.bGameMusicOn = (!SWGame.bGameMusicOn);
  },  
  gameState:"Splash",
  arrHerosChoosen: [],
  arrVillansChoosen: [],
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
    
  

    SWGame.Villan.getRandomVillan(SWGame.Villan);
    var MyVillan1Pic = SWGame.Villan.hPic;
    var MyVillan1Name = SWGame.Villan.hName;
  
    SWGame.Villan.getRandomVillan(SWGame.Villan);
    var MyVillan2Pic = SWGame.Villan.hPic;
    var MyVillan2Name = SWGame.Villan.hName;

    SWGame.Villan.getRandomVillan(SWGame.Villan);
    var MyVillan3Pic = SWGame.Villan.hPic;
    var MyVillan3Name = SWGame.Villan.hName;
  
    $("#Villan1").attr("src",MyVillan1Pic);
    $("#Villan2").attr("src",MyVillan2Pic);
    $("#Villan3").attr("src",MyVillan3Pic);
  
    $("#Villan1").attr("name", MyVillan1Name);
    $("#Villan2").attr("name", MyVillan2Name);
    $("#Villan3").attr("name", MyVillan3Name);
    
    

    SWGame.arrHerosChoosen.length=0;
    SWGame.arrVillansChoosen.length=0;
    this.setGameState("Splash");    

    $("#VillanStory1").text("");     
    $(".vilport").width("98px");
    $(".vilport").height("102px");
    $("#BeginFightBut").hide();
    
    
    $("#attkimg").attr("src","./assets/images/FightNow.png");
    if(SWGame.bGameMusicOn){
      SWGame.gameMusicPlayer.play();
    } else{
      SWGame.gameMusicPlayer.pause();
    }
    SWGame.bInFight = false;
    $("#Arena").empty();
    $("#MyHero").width(98 * 1.8);
    $("#MyHero").height(102 * 1.8);
    $("#InstructAttack").text('Select a Villan to fight. Defeat them all to win!');
    SWGame.Hero.hDMG = 0;
    SWGame.Hero.hBaseDMG =0;
    if(SWGame.bOnLoad){
    $(".portrait").on('click',function () {
      SWGame.Hero.clickMyHero(SWGame.Hero,this);
      });  
    $(".vilport").on('click',function () {
      SWGame.Villan.clickMyVillan(SWGame.Villan,this);
      });
    $("#BeginFightBut").on('click', function (){
      SWGame.Attack();        
      });
      SWGame.bOnLoad = false;
    }
    SWGame.Hero.hDMG = ( +SWGame.Hero.hBaseDMG);
  },
  Attack: function(){
    if(!SWGame.bInFight){
      
      SWGame.gameSFX.attr("src","./assets/sounds/ISaber.mp3");
      $("#attkimg").attr("src","./assets/images/Attack.png");      
      $("#InstructAttack").text('You are now in a fight to the death with ' + SWGame.Villan.hLongName);
      SWGame.bInFight = true;
    }
    else
    {      
      var BattleText = "";
      //Do Attack
      SWGame.Villan.hHP = (+SWGame.Villan.hHP) - (+SWGame.Hero.hDMG);
      //Do Counter Attack
      SWGame.Hero.hHP = (+SWGame.Hero.hHP) - (+SWGame.Villan.hDMG);      
      
      BattleText = "<p>You hit " + SWGame.Villan.hLongName + " for " + SWGame.Hero.hDMG + "</p> ";
      BattleText += "<p>" + SWGame.Villan.hLongName + " counter attacks for " + SWGame.Villan.hDMG + "</p>";
      BattleText += "<p>" + SWGame.Hero.hName + "'s Health is " + SWGame.Hero.hHP + "</p>";
      BattleText += "<p>" + SWGame.Villan.hLongName + "'s Health is " + SWGame.Villan.hHP + "</p>";
      //Check for Lose
      if(SWGame.Hero.hHP <= 0)
      {
        BattleText += "<p>" + "Im afraid " + SWGame.Villan.hLongName + " has killed you..." +"</p>"
        SWGame.setGameState("Over");
        return;
      }
      //Check for Win
      if(SWGame.Villan.hHP <= 0)
      { 
        BattleText += "<p>" + "You Did It!!! You killed " + SWGame.Villan.hLongName +"</p>"
        SWGame.Villan.curVillanImg.src = './assets/images/Skull.png';
              
        $("#InstructAttack").text('Select a Villan to fight. Defeat them all to win!');
        $("#VillanStory1").text("");     
        $(".vilport").width("98px");
        $(".vilport").height("102px");
        $("#attkimg").attr("src","./assets/images/FightNow.png");
        $("#BeginFightBut").hide();
        SWGame.bInFight = false;
        SWGame.bPlayerWon = true;
        $.each($(".vilport"),
          function (i,val){if(val.src.indexOf('Skull')<0)
                  {
                    SWGame.bPlayerWon=false
                  } 
          });
        if(SWGame.bPlayerWon){
          SWGame.setGameState("Over");
          return;
        };
        return;
      }
      
      $("#VillanStory1").html(BattleText);
      SWGame.Hero.hDMG = (+SWGame.Hero.hDMG) + (+ SWGame.Hero.hBaseDMG);
      var rnd = Math.random();
      if(rnd > .5){
        SWGame.gameSFX.attr("src","./assets/sounds/LSaber.mp3");
      }else{
        SWGame.gameSFX.attr("src","./assets/sounds/Blaster.mp3");
      }
      
      
      
      SWGame.gameSFXPlayer.play();
      
    }
    
    
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
       this.gameMusic.attr("src","./assets/sounds/SWFight.mp3");
       $("#MyHero").attr("src",SWGame.Hero.hPic);
       $("#HeroStory").text(SWGame.Hero.hText);

       

       $(document.body).css("backgroundImage","url('./assets/images/DeathStar.jpg')");
       break;
      case "Over":
        $("#GameOverInside").remove();
        if(SWGame.bPlayerWon){
          $("body").css("backgroundImage","url('./assets/images/Ewok-celebration.jpg')");
          this.gameMusic.attr("src","./assets/sounds/Win.mp3");
          var GO = $("<div class='GameOver' id='GameOverInside'>").html("<h1 class='GameOver'>Game Over</h1><p class='GameOverp'>You Have Won! The Galaxy is SAFE! for now...</p><button class='swbutton' onclick='SWGame.reset()'><img src='./assets/images/Reset.png'/></button>");
          $("#Over").append(GO);
        }else{
          $("body").css("backgroundImage","url('./assets/images/Lose.jpg')");
          this.gameMusic.attr("src","./assets/sounds/Lose.mp3");
          var GO = $("<div class='GameOver' id='GameOverInside'>").html("<h2 class='GameOver'>Game Over</h2><p class='GameOverp'>You Are Dead! The light in the Galaxy has dimmed...</p><button class='swbutton' onclick='SWGame.reset()'><img src='./assets/images/Reset.png'/></button>");
          $("#Over").append(GO);
        };              
       
       $("#Over").show();
       break;
    }
  },    
  Hero:{
    arrhName:["Luke","Leia","Han","C3-PO","R2-D2","Chewie"],
    arrhPic: ["./assets/images/Luke.png","./assets/images/Leia.png","./assets/images/Han.png","./assets/images/C3.png","./assets/images/R2.png","./assets/images/Chewie.png"],
    arrhSoundBite: ["./assets/sounds/Luke.mp3","./assets/sounds/Leia.mp3","./assets/sounds/Han.mp3","./assets/sounds/C3PO.mp3","./assets/sounds/R2D2.mp3","./assets/sounds/Chewie.mp3"],
    arrhFlavorText: ["After the celebrations on Yavin IV, Luke was sent on a dangerous diplomatic missions to gain the help of outter rim warlords, gangsters and near do wells. Quickly he was betrayed however, and now is closely followed by imperial agents!","Leia was taken under the wing of the Rebel leader Mon Motha as a promising new commander. However, on a routine inspection mission their ship crashed landed on what they believed was an abandoned moon.  Unknown to them this would prove to be the fight of Leia’s life!" ,"Han was off to Tatooine. It was long overdue, he had to make payments to the Hutts or he wouldn't be the pilot of the Falcon for much longer, heck he wouldn't be alive much longer. Unfortunately, the Falcon had other plans forcing Han to make repairs at a uncharted starport.", "C3-PO incompetent lacky of R2 has gotten himself in a pickle not 3 minutes after R2 left on some foolish errand. Enrolling in a local rebellion coding bootcamp, he believes it's his last hope to quell the evaporator rebellion simmering on Tatooine.  Unfortunately for our golden shiny friend, the Empire has other plans for him.","R2-D2 leader of the Rebellion, has taken it upon himself to destroy the emperors newest evil battle station. R2 realizes that while everyone else stands around being useless, only he  can truly save the galaxy... Luke.. pfft...", "Chewie was seperated from Han after the battle on Yavin, it was time for him to return to his homeworld due to recent events that portend of bad omens. Upon landing on his home planet, he was supprised to find his x girl friend became an imperial spy!"],
    arrhHP: ["170","160","170","160","170","200"],
    arrhDMG: ["14","11","12","7","12","8"],
    hName:"",
    hPic:"",    
    hSound:"",
    hText:"",
    hHP: 0,
    hBaseDMG: 0,
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
      SWGame.gameSFX.attr("src",myHero.hSound);
      try{SWGame.gameSFXPlayer.play();}catch(err){};
      
       
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
      myHero.hSound = myHero.arrhSoundBite[i];      
      myHero.hText = myHero.arrhFlavorText[i];
      myHero.hDMG = (+myHero.arrhDMG[i]);
      myHero.hBaseDMG = (+myHero.arrhDMG[i]);
      
      return myHero;
    }
  },
  Villan:{
    arrhName:["Vader","Sidious","Maul","Sebulba","Boba","Dooku"],
    arrhLongName:["Darth Vader","Darth Sidious", "Darth Maul", "Sebulba", "Boba Fett", "Count Dooku"],
    arrhPic: ["./assets/images/Vader.png","./assets/images/Sidious.png","./assets/images/Maul.png","./assets/images/Sebulba.png","./assets/images/Boba.png","./assets/images/Duku.png"],
    arrhSoundBite: ["./assets/sounds/Vader.mp3","./assets/sounds/Sidious.mp3","./assets/sounds/Maul.mp3","./assets/sounds/Sebulba.mp3","./assets/sounds/BobaFett.mp3","./assets/sounds/Dooku.mp3"],
    arrhFlavorText: ["This brooding lord of the sith, teeming with anger and hatred, reaches out with the force and detects your presense. Now nothing can save you from the wrath of Darth Vader.","You truly have stumbled upon a plot of great consequence, for at it's center is the Emperor himself, Lord Sidious!","You are confronted with one of the most dangerous and unique weapons in the known universe a dual bladed lightsaber.  Which can only mean one thing, Darth Maul has found you.","This notorious gangster, formerly a champion pod racer, has fallen on hard times, however, his mean streak is still wider than the back end of a Hutt. Best steer clear of this one or you may wind up banta fodder.", "No one has ever escaped Boba Fett before. You think you can best the best of the best... Boba thinks your just going to die tired.","This Dark Lord's saber style became so strong that he could only be defeated by a Anakin Skywalker himself, having even escaped master Yoda and Obi-Wan at one point... prepare to meet Count Dooku!"],
    arrhHP: ["160","90","120","100","110","140"],
    arrhDMG: ["16","18","13","10","12","13"],

    curVillanImg:"",
    hName:"",
    hLongName:"",
    hPic:"",    
    hSound:"",
    hText:"",
    hHP: 0,
    hDMG: 0,    
    getRandomVillan: function(myVillan)
    {
      var myrnd = Math.floor((Math.random()*6));
      while(SWGame.arrVillansChoosen.includes(myrnd)){
        myrnd = Math.floor((Math.random()*6)); 
      } 
      SWGame.arrVillansChoosen.push(myrnd);

      
      myVillan = myVillan.setVillan(myVillan, myrnd);
      return myVillan;
    },
    clickMyVillan: function(myVillan, inElement){
      if(SWGame.bInFight){return myVillan};
      if(inElement.src.indexOf('Skull')>=0){return myVillan};
      myVillan = myVillan.setMyVillan(myVillan,inElement.name);
      myVillan.curVillanImg = inElement;
      $("#MyVillan").attr("src",myVillan.hPic);
            
      $("#VillanStory1").text("");     
      $(".vilport").width("98px");
      $(".vilport").height("102px");
      
      
      $("#VillanStory1").text(myVillan.hText);
      $("#BeginFightBut").show();
      

      switch(inElement.id)
      {
        case "Villan1":
          
          $("#Villan1").width(98 * 1.8);
          $("#Villan1").height(102 * 1.8);
          break;
        case "Villan2":
          //$("#VillanStory2").text(myVillan.hText);
          $("#Villan2").width(98 * 1.8);
          $("#Villan2").height(102 * 1.8);
          break;
        case "Villan3":
          //$("#VillanStory3").text(myVillan.hText);
          $("#Villan3").width(98 * 1.8);
          $("#Villan3").height(102 * 1.8);
          break;
      }
      
    
      SWGame.gameSFX.attr("src",myVillan.hSound);
      SWGame.gameSFXPlayer.play();
      
      return myVillan;
    }, 
    setMyVillan: function(myVillan, myVillansName)
    {
      
      myVillan = myVillan.setVillan(myVillan, myVillan.arrhName.indexOf(myVillansName));
    
      return myVillan;
    },
    setVillan: function(myVillan, i)
    {
      myVillan.hName = myVillan.arrhName[i];
      myVillan.hPic = myVillan.arrhPic[i];
      myVillan.hHP = myVillan.arrhHP[i];
      myVillan.hSound = myVillan.arrhSoundBite[i];
      myVillan.hDMG = myVillan.arrhDMG[i];
      myVillan.hText = myVillan.arrhFlavorText[i];
      myVillan.hLongName = myVillan.arrhLongName[i];
      return myVillan;
    }
  }
  
}
$(document).ready(function () {  
  SWGame.reset();
  
});