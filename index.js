const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
let left = document.querySelector("#left") 
let bottom = document.querySelector("#down") 
let right = document.querySelector("#right") 
let up = document.querySelector("#up") 
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.95
let timerId = 0

function createGrid() {
    for (let i = 0; i < width*width; i++){
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    //reset snake
    currentSnake = [2,1,0]
    //reset score
    score = 0
    //re add new score to browser
    scoreDisplay.textContent = score
    //reset snakes direction
    direction = 1
    //rest interval time
    intervalTime = 1000
    //generate new apple
    generateApple()
    //re add the class of snake to new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}

function move() {
    // if the snake hits the bottom, right, left or top walls. 
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width -1  && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
    return clearInterval(timerId)

    //remove last element
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    //add square in snakes current direction
    currentSnake.unshift(currentSnake[0] + direction)
    //when snake eats apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        (squares[currentSnake[0]].classList.remove('apple'))
        //grow the snake
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        generateApple()
        //add one to score
        score++
        scoreDisplay.textContent = score
        //speed the snake up
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
}

//generate an apple
function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}
generateApple()

//add event listeners to control the snake using the four buttons
up.addEventListener("click",()=>direction= -width ) 
down.addEventListener("click",()=>direction= +width ) 
left.addEventListener("click",()=>direction= -1 ) 
right.addEventListener("click",()=>direction= 1 )

//add event listener to control the snake
//document.addEventListener('keydown', control)
//add event listener to start/reset the game
startButton.addEventListener('click', startGame)