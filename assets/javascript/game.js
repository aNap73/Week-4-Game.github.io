SWGame ={
  gameState:"Splash",
  arrHerosChoosen: [],
  reset: function (){
    SWGame.arrHerosChoosen.length=0;
  },  
  Hero:{
    arrhName:["Luke","Leia","Han","C3-PO","RD-D2","Chewie"],
    arrhPic: ["./assets/images/Luke.png","./assets/images/Leia.png","./assets/images/Han.png","./assets/images/C3.png","./assets/images/R2.png","./assets/images/Chewie.png"],
    arrhHP: ["200","75","150","60","70","180"],
    arrhDMG: ["20","10","15","7","15","18"],
    hName:"",
    hPic:"",    
    hHP: 0,
    hDMG: 0,    
    getHero: function(myHero)
    {
      var myrnd = Math.floor((Math.random()*6));
      while(SWGame.arrHerosChoosen.includes(myrnd)){
        myrnd = Math.floor((Math.random()*6)); 
      } 
      SWGame.arrHerosChoosen.push(myrnd);

      console.log("rnd= " + myrnd);
      myHero.hName = myHero.arrhName[myrnd];
      myHero.hPic = myHero.arrhPic[myrnd];
      myHero.hHP = myHero.arrhHP[myrnd];
      myHero.DMG = myHero.arrhDMG[myrnd];
      return myHero;
    }
  }
  
}
$(document).ready(function () {
  SWGame.reset();
  var MyHero1 = SWGame.Hero.getHero(SWGame.Hero).hPic;
  var MyHero2 = SWGame.Hero.getHero(SWGame.Hero).hPic;
  var MyHero3 = SWGame.Hero.getHero(SWGame.Hero).hPic;
  $("#Hero1").attr("src",MyHero1);
  $("#Hero2").attr("src",MyHero2);
  $("#Hero3").attr("src",MyHero3);
  console.log(SWGame);
});