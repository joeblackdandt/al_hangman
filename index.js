// JavaScript File
var dictionary = [  'quarter',
                    'certain',
                    'stranger',
                    'pink',
                    'tame',
                    'raise',
                    'sun',
                    'expert',
                    'trick',
                    'odd',
                    'tug',
                    'hate',
                    'curvy',
                    'comfortable',
                    'flag',
                    'honey',
                    'stiff',
                    'huge',
                    'bore',
                    'bee',
                    'known',
                    'support',
                    'yoke',
                    'occur',
                    'launch',
                    'suffer',
                    'drunk',
                    'shop',
                    'protest',
                    'unequal',
                    'waste',
                    'rough',
                    'preach',
                    'position',
                    'cute',
                    'fireman',
                    'plausible',
                    'bat',
                    'title'
                    ];
                    
var currentWord ='';   
var attemps = 6;
                    
var newGameBtn = document.getElementsByClassName('new-game-btn')[0];
var checkBtn = document.getElementsByClassName('check-letter-btn')[0];
var hangmanImg = document.getElementsByClassName('hangman-img')[0];
var letterInput = document.getElementById('guess_input');
var wordPlacement = document.getElementsByClassName('hangman-word')[0];


function pickRandomWord(){
    currentWord = dictionary[Math.floor(Math.random()*dictionary.length)];
}   


   
//INITIALIZE                 
function onLoadEvent(){
    newGameBtn.addEventListener('click',newGame);
    newGame();
    checkBtn.addEventListener('click',checkLetter);
    
    letterInput.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            checkLetter();
        }
    });
}

//new game function
function newGame(event){
    pickRandomWord();
    
    wordPlacement.innerHTML = '';
    
    for (var i=0; i<currentWord.length;i++){
        wordPlacement.innerHTML+='_ '
    }
    
    console.log(currentWord);
    enableControls();
    document.getElementById('lose').classList.add('hidden');
    document.getElementById('win').classList.add('hidden');
    document.getElementsByClassName('wrong-letters')[0].innerHTML = '';
    
    attemps = 6;
    letterInput.focus();
    hangmanImg.style.backgroundPositionX = 0;
}

function checkLetter(){
    var letter = letterInput.value[0];
    
    if (letter){
        letter = letter.toLowerCase();
        
        if(currentWord.indexOf(letter)>-1){
            
            var previousWordPlacement = wordPlacement.innerHTML;
            wordPlacement.innerHTML = '';
            
            for (var i=0; i<currentWord.length;i++){
                if (currentWord[i]==letter){
                    wordPlacement.innerHTML+=letter + ' ';
                }
                else if (previousWordPlacement[i*2]=='_'){
                    wordPlacement.innerHTML+='_ ';
                }
                else {
                    wordPlacement.innerHTML+= previousWordPlacement[i*2] + ' ';
                }
            }
        }
        else{
            if (document.getElementsByClassName('wrong-letters')[0].innerHTML.indexOf(letter)<0) {
                document.getElementsByClassName('wrong-letters')[0].innerHTML += letter +' ';
                attemps--;
                var positionOffset = (6-attemps)*(-75);
                hangmanImg.style.backgroundPositionX = positionOffset + 'px';
            }
        }
        
        if (attemps === 0){
            disableControls();
            document.getElementById('lose').classList.remove('hidden');
        }
        
        if(wordPlacement.innerHTML.indexOf("_")<0){
            disableControls();
            document.getElementById('win').classList.remove('hidden');
        }
        
        letterInput.value = '';
        letterInput.focus();
    }
}


function disableControls(){
    checkBtn.classList.add('disabled');
    checkBtn.setAttribute('disabled',true);
    letterInput.classList.add('disabled');
    letterInput.setAttribute('disabled',true);
}

function enableControls(){
    checkBtn.classList.remove('disabled');
    checkBtn.removeAttribute('disabled');
    letterInput.classList.remove('disabled');
    letterInput.removeAttribute('disabled');
}