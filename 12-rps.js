let score = 
    JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    tie:0
    };
    
updateScoreElement();
          
    
    
/*if(!score){
     score={
     wins:0,
     losses:0,
     tie:0
     }
     };
*/
let isautoplay=false;
let intervalid;
function autoplay()
{
     if(!isautoplay)
     {
       intervalid = setInterval( function(){
         let playermove=pickComputerMove();
         playGame(playermove);
         },1000);
         isautoplay=true;
         document.querySelector(".js-autoplay-button").innerHTML="Stop playing";
     }
     else{
         clearInterval(intervalid);
         isautoplay=false;
         document.querySelector(".js-autoplay-button").innerHTML="Auto play";
     }
}

// function for clicking "a" to perform  autoplay 

// you can play the game by clicking the r,p,s-----
document.body.addEventListener("keydown",(event)=>
{

    if(event.key === 'r')
    {
     playGame("rock");
    }
    else if(event.key === 'p')
    {
     playGame('paper');
    }
    else if(event.key === 's')
    {
      playGame('scissors');
    }
    else if(event.key === "a")
    {
      autoplay();
    }
  /*  else if(event.key === "Backspace")
    {
           reset_score();
        }*/
});



document.querySelector(".js-rock-button").addEventListener("click",()=>
{
     playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click",() =>{
    playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click",() =>
{
    playGame("scissors");
});


/*  document.querySelector(".js-reset-button").addEventListener("click",() =>
{
    reset_score();
});
*/


//======reset score


function reset_score()
{
       score.wins = 0;
   score.losses = 0;
   score.tie = 0;
   localStorage.removeItem('score');
   updateScoreElement();
}




//---------for confirmation test
function reset_confirmation()
{
        document.querySelector(".js_confirmation_message").innerHTML=`
        Are you sure you want to reset the score?
        <button class="js-confirmation-yes" 
         onclick="
             reset_score();
             document.querySelector(".js_confirmation_message").innerHTML='';
         "> Yes </button>
        <button class="js-confirmation-no"
         onclick="
             document.querySelector(".js_confirmation_message").innerHTML='';
         "> No</button>`;
}

//----for confirmation yes test
/*
document.querySelector(".js-confirmation-yes").addEventListener("click",() =>
{
       reset_score();
       document.querySelector(".js_confirmation_message").innerHTML='';
});

document.querySelector(".js-confirmation-no").addEventListener("click",() =>
{
        document.querySelector(".js_confirmation_message").innerHTML='';
});
*/

// you don't place onclick and eventlistener class at same time
/*
document.querySelector(".js-autoplay-button").addEventListener("click",() =>
{
     autoplay();
});
*/


function playGame(parameter1)
{ 
    const computerMove=pickComputerMove();
    let result='';
    if(parameter1 === 'scissors')
    {
          if(computerMove === 'scissors')
                result='tie';
          else if(computerMove === 'rock')
               result='you lose';
          else if(computerMove === 'paper')
                result='you win';
    }
    else if(parameter1 === 'paper')
    {
        if(computerMove === 'paper')
          result='tie';
        else if(computerMove === 'scissors')
          result='you lose';
        else if(computerMove === 'rock')
           result='you win';
    }
    else if(parameter1 === 'rock')
    {
        if(computerMove === 'rock')
             result='tie';
        else if(computerMove === 'paper')
              result='you lose';
       else if(computerMove === 'scissors')
             result='you win';
    }
   
    if(result === 'you win')
   {
         score.wins++;
   }
   else if(result === 'you lose')
   {
         score.losses++;
   }
   else if(result === 'tie')
   {
          score.tie++;
          
    }
    
     localStorage.setItem('score',JSON.stringify(score));
     updateScoreElement();
     document.querySelector('.js-result').innerHTML =`${result}`;
     document.querySelector('.js-moves').innerHTML=`You 
  <img src="images/${parameter1}.png" class="move-icon">
  <img src="images/${computerMove}.png" class="move-icon" >
  Computer`;
     
 }
 
function updateScoreElement(){
document.querySelector('.js-score').innerHTML =`Wins:${score.wins} Losses:${score.losses} Ties:${score.tie}`;
 }
 
let computerMove='';
function pickComputerMove()
{
   const randomNumber=Math.random();
  if(randomNumber>=0 && randomNumber<1/3)
  {
      computerMove='rock';
  }
  else if(randomNumber>=1/3 && randomNumber<2/3)
  {
      computerMove='paper';
  }
  else if(randomNumber>=2/3 && randomNumber<1)
  {
      computerMove='scissors';
  }
  return computerMove;
}
