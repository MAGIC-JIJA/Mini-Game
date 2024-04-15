//------------------------------------------------------------  Take with querySelector id from HTML

var $start = document.querySelector('#start')                 
var $game = document.querySelector('#game')                  
var $time = document.querySelector('#time')                   
var $timeHeader = document.querySelector('#time-header')      
var $resultHeader = document.querySelector('#result-header')  
var $result = document.querySelector('#result')               
var $gameTime = document.querySelector('#game-time')          

//------------------------------------------------------------  Array of box colors

var colors = ['red', 'green','blue','purple', 'pink']

//------------------------------------------------------------  Create new vars: num-score, boolean-isGameStarted

var score = 0
var isGameStarted = false

//------------------------------------------------------------  Add Events 

$start.addEventListener('click',startGame)                    
$game.addEventListener('click',handleBoxClick)                
$gameTime.addEventListener('input',setGameTime)              

//------------------------------------------------------------  Optimizing coding

function show($el){
    $el.classList.remove('hide')                               
}
function hide($el){
    $el.classList.add('hide')                                  
}

//------------------------------------------------------------  Start game logic

function startGame(){
    score = 0
    setGameTime()                                             
    $gameTime.setAttribute('disabled', true)                  //input blocked
    $game.style.backgroundColor = '#fff'                      
    hide($start)                                              

    isGameStarted = true                                      

    var interval = setInterval(function(){                    //New var: num-interval               second arguments in SetInterval time in mls
        var time = parseFloat($time.textContent)//округляю

        if(time <= 0){                                        
            clearInterval(interval)
            endGame()
        }else{
                $time.textContent = (time - 0.1).toFixed(1)   
            }
    }, 100)

    renderBox()                                               //Generate new Box
}

//------------------------------------------------------------  Set Game Time logic

function  setGameTime(){
    var time = +$gameTime.value                               
    $time.textContent = time.toFixed(1)                       
    show($timeHeader)                                         
    hide($resultHeader)                                       
}

//------------------------------------------------------------  Set Game Score logic

function setGameScore() {
    $result.textContent = score.toString()
}

//------------------------------------------------------------  End game logiv

function endGame(){
    isGameStarted = false                                     
    setGameScore()                                            
    $gameTime.removeAttribute('disabled')                     //input unblocked
    show($start)                                              
    $game.innerHTML = ''                                      //Empty string for predicting not needed new box
    $game.style.backgroundColor = '#ccc'                      
    hide($timeHeader)                                         
    show($resultHeader)                                       
}

//------------------------------------------------------------  Event of click on box

function handleBoxClick(event){
if(!isGameStarted){                                           
    return
}
if(event.target.dataset.box)                                   
{
    score++                                                   
    renderBox()                                               
}
}

//------------------------------------------------------------  Generate new box logic

function  renderBox(){
    $game.innerHTML = ''                                      //Empty string for predicting not needed new box
    var box = document.createElement('div')                   //Create new div

    var boxSize = getRandom(30, 100)                          

    var gameSize = $game.getBoundingClientRect()

    var maxTop = gameSize.height - boxSize                    
    var maxLeft = gameSize.width - boxSize                    

    var randomColorIndex = getRandom(0, colors.length)        

    box.style.height = box.style.width = boxSize + 'px'       
    box.style.position = 'absolute'                           
    box.style.backgroundColor =  colors[randomColorIndex]     
    box.style.top = getRandom(0,maxTop) + 'px'                
    box.style.left = getRandom(0,maxLeft) + 'px'              
    box.style.cursor = 'pointer'                              
    box.setAttribute('data-box','true')

    $game.insertAdjacentElement('afterbegin', box)            //Create in div new box
}

//------------------------------------------------------------  Random diapasone logic

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min)
}

//------------------------------------------------------------