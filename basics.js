
/*
bill = [120,231,441];

tip=[];
paid=[];



function cal()
{
   for (let  i= 0; i < bill.length; i++) {
     if(bill[i]<50)
     {
       per=0.2;
       
     }
     else if(bill[i]<200)
     {
       per=0.15;
       
     }
     else
     {
       per=0.1;
     
    }
     
   }
   return per;
}
k=cal();
for(let i=0;i<bill.length;i++)
{
  tip[i]=bill[i]*k;
  paid[i]=tip[i]+bill[i];
}
console.log(tip,paid)

*/

var score, roundscore,dice,activeplayer ,lastdice,final_score;
var game;

document.querySelector('.dice').style.display='none';

init();
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(game)
    {
     dice=Math.floor(Math.random()*6)+1;
     document.querySelector('.dice').style.display='block';
     document.querySelector('.dice').src='dice-'+dice+'.png';
     
     if(dice===6 && lastdice===6){
       score[activeplayer]=0;
      document.getElementById('current-'+activeplayer).textContent = '0';
         document.getElementById('score-'+activeplayer).textContent = '0';
         nextplayer();
     }
    else if(dice!==1)
    {
      roundscore+=dice;
      document.querySelector('#current-'+activeplayer).textContent = roundscore;
    }
    else
    { 
      nextplayer();
    }
    lastdice=dice;
  }   
});

  // hold button
document.querySelector('.btn-hold').addEventListener('click',function(){

      score[activeplayer]+=roundscore;
      document.getElementById('score-'+activeplayer).textContent = score[activeplayer];
      final_score=document.querySelector('.final-score').value;
      if(!final_score)
         final_score=20;
      if(score[activeplayer]>=final_score)
      {
        document.getElementById('name-'+activeplayer).textContent ='Winner' ;
        document.querySelector('.dice').style.display='none';
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('winner');
        game=false;
      }
      else
      nextplayer();
    
});

document.querySelector('.btn-new').addEventListener('click',init);

function init(){
  game=true
  score=[0,0];
  roundscore=0;
  activeplayer=0;
  lastdice=0;

  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player-1';
  document.getElementById('name-1').textContent = 'Player-2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');



}

function nextplayer()
{

  activeplayer===0?activeplayer=1:activeplayer=0;
       roundscore=0; 

         


       document.getElementById('current-0').textContent = '0';
       document.getElementById('current-1').textContent = '0';

       document.querySelector('.player-0-panel').classList.toggle('active');
       document.querySelector('.player-1-panel').classList.toggle('active');
       document.querySelector('.dice').style.display='none';

       
}