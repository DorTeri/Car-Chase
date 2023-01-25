
const WALL = '🔷'
const TRAP = '🚧'
const ROAD = ' '
const CRASH = '💥'
const FLAG = '🏁'
const FUEL = '&#9981'

var gBoard
var gIsGameOn = false
var gFinishLine
var gTimer = 15
var gTimerInterval

function onInit() {
    gBoard = buildBoard()
    createGamer(gBoard)
    createBike(gBoard)
    renderBoard(gBoard, '.board')
}

function startGame() {
    gIsGameOn = true
    timer()
    addElements()
}

function restartGame() {
    clearIntervals()
    gGamerRoad = []
    gTimer = 15
    gGamer.fuel = 70
    document.querySelector('.btn-restart').hidden = true
    onInit()
}

function buildBoard() {
    const size = 20
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = ROAD

            if (i === 0 || j === 0 ||
                i === size - 1 || j === size - 1) {
                board[i][j] = WALL
            }
            if (i === 17 && j === 0) board[i][j] = ROAD
        }
    }
    addRoad(board)
    return board
}

function addRoad(board) {
    for (let i = 1; i < board.length - 2; i++) {
        for (let j = 1; j < board[i].length - 2; j++) {
            board[i][j] = (Math.random() > 0.58) ? TRAP : ROAD
            if (i === 17 && j === 1 || i === 17 && j === 2) board[i][j] = ROAD

        }

    }
}

function addFinishLine() {
    var i = getRandomIntInclusive(1, gBoard.length - 2)
    var location = { i: i, j: gBoard[0].length - 1 }
    gBoard[i][location.j] = ROAD
    addFinishFlags(location)
    renderCell(location, ROAD)
    gFinishLine = location
    makeSound('gate')
}

function gameOver() {
    gIsGameOn = false
    if (!gGamer.isWin) renderCell(gGamer.location, CRASH)
    document.querySelector('.btn-restart span').innerText = (gGamer.isWin) ? 'You win!' : 'You lost'
    document.querySelector('.btn-restart').hidden = false
}

function bikeStart() {
    document.querySelector('.bike').hidden = false
    gBikeInterval = setInterval(moveBike, 200)
}

function timer() {
    gTimerInterval = setInterval(() => {
        if (gTimer > 0) {
            gTimer--
            document.querySelector('h2 span').innerText = gTimer
        }
        else {
            clearInterval(gTimerInterval)
            addFinishLine()
        }
    }, 1000);
}

function makeSound(sound) {
    var gate = new Audio('sounds/gate.wav')
    var win = new Audio('sounds/won.wav')
    var lost = new Audio('sounds/lost.wav')
    var fuel = new Audio('sounds/fuel.wav')
    switch (sound) {
        case 'gate':
            gate.play()
            break
        case 'win':
            win.play()
            break
        case 'lost':
            lost.play()
            break
        case 'fuel':
            fuel.play()
            break
    }
}

function addFinishFlags(location) {
    var firstFlagLocation = { i: location.i + 1, j: location.j }
    var secondFlagLocation = { i: location.i - 1, j: location.j }
    gBoard[firstFlagLocation.i][firstFlagLocation.j] = FLAG
    gBoard[secondFlagLocation.i][secondFlagLocation.j] = FLAG
    renderCell(firstFlagLocation, FLAG)
    renderCell(secondFlagLocation, FLAG)
}

function addFuel() {
    var emptyLocations = getEmptyLocation(gBoard)
    for (let i = 0; i < 5; i++) {
        var emptyLocationIdx = [getRandomIntInclusive(0, emptyLocations.length - 1)]
        var emptyLocation = emptyLocations[emptyLocationIdx]
        gBoard[emptyLocation.i][emptyLocation.j] = FUEL
        renderCell(emptyLocation, FUEL)
        emptyLocations.splice(emptyLocationIdx, 1)
    }
}

function addElements() {
    setTimeout(addFuel, 1000)
    setTimeout(bikeStart, 800)
}

function clearIntervals() {
    clearInterval(gTimerInterval)
    clearInterval(gBikeInterval)
}