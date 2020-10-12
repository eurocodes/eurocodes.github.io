'use strict';
/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
/*
alert('ATTENTION:' + '\n' + 'This Project is under construction by UGOCHUKWU.' + '\n' + 'All features may not be functional yet but you can still have fun');*/

var scores, roundScore, activePlayer, gamePlaying;

init();

//var prevDice

document.querySelector('.btn-roll').addEventListener('click', () => {
    
    if (gamePlaying)
        {
            //1. Generate a random number
            var dice1 = Math.floor(Math.random() * 6) + 1;
            var dice2 = Math.floor(Math.random() * 6) + 1;
    
            //2. Display the result
            var diceDOm1 = document.getElementById('dice-1');
            var diceDOm2 = document.getElementById('dice-2');
            
            diceDOm1.style.display = 'block';
            diceDOm2.style.display = 'block';
            
            diceDOm1.src = 'dice/dice-' + dice1 + '.png';
            diceDOm2.src = 'dice/dice-' + dice2 + '.png';
    
    
            //Check if we had two '6' in a row
            if (dice1 === 1 && dice2 === 1)
                {
                    //Player looses score
                    scores[activePlayer] = 0;
                    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                    nextPlayer();
                    
                } else if (dice1 !== 1 && dice2 !== 1)
                    {
                        //Add to score
                        roundScore += (dice1 + dice2);
                        getRoundScore();
                    } else
                        {
                            //Reset roundScore to zero and pass to the next player
                            getRoundScore();
                            nextPlayer();
                
                        }
            //prevDice = dice;
        }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
    if (gamePlaying)
        {
            //Add current score to global score
            scores[activePlayer] += roundScore;
    
            //Update UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            
            var input = document.querySelector('.winning-score').value;
            var winningScore;
            
            //Undefined, null, '0' or "" are COERCED to false
            //Anything else is COERCED to true
            if (input)
                {
                    winningScore = input;
                } else
                    {
                        winningScore = 100;
                    }
    
            //Check if player won the game
            if (scores[activePlayer] >= winningScore)
                {
                    roundScore = 0;
                    getRoundScore();
                    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                    document.getElementById('dice-1').style.display = 'none';
                    document.getElementById('dice-2').style.display = 'none';
                    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                    gamePlaying = false;
                } else
                    {
                        nextPlayer();
                    }
        }
});

function nextPlayer(){
    document.getElementById('current-' + activePlayer).textContent = 0;
    activePlayer === 0? activePlayer = 1: activePlayer = 0;
    //The above is same as if else statement
    roundScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
                
                
//  document.querySelector('.player-0-panel').classList.remove('active');
//  document.querySelector('.player-1-panel').classList.add('active');
                
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    
    if (activePlayer === 0)
        {
            document.getElementById('first').innerHTML = 'CURRENT';
            document.getElementById('second').innerHTML = 'WAITING';
        } else if(activePlayer === 1)
                {
                    document.getElementById('second').innerHTML = 'CURRENT';
                    document.getElementById('first').innerHTML = 'WAITING';
                }
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function getRoundScore(){
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
}