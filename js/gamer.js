
const GAMER = '<img class="car" src="img/car.jpeg">'
var gGamer
var gGamerRoad = []

function createGamer(board) {
    gGamer = {
        location: {
            i: 17,
            j: 0
        },
        score: 0,
        isWin: false , 
        deg: 0,
        fuel: 70
    }
    board[gGamer.location.i][gGamer.location.j] = GAMER
}

function moveGamer(ev) {

    const nextLocation = getNextLocation(ev)

    if(gGamerRoad.length === 0) startGame()
    if(!gIsGameOn) return
    if (!nextLocation) return
    gGamer.fuel--
    document.querySelector('h3 span').innerText = gGamer.fuel
    if(gGamer.fuel === 0) {
        gGamer.isWin = false
        makeSound('lost')
        gameOver()
        return
    }

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if(nextCell === TRAP) return
    if(nextCell === FLAG) return
    if(nextCell === FUEL) {
        gGamer.fuel += 20
        makeSound('fuel')
        document.querySelector('h3 span').innerText = gGamer.fuel
    }

    if (nextCell === BIKE) {
        gGamer.isWin = false
        crash()
        makeSound('lost')
        gameOver()
        return
    }
    gGamerRoad.push(nextLocation)

    gBoard[gGamer.location.i][gGamer.location.j] = ROAD

    renderCell(gGamer.location, ROAD)

    gGamer.location = nextLocation

    gBoard[gGamer.location.i][gGamer.location.j] = GAMER
    renderCell(gGamer.location, getGamerHTML(gGamer.deg))
    if (gGamer.location.j === gBoard[0].length - 1) {
        gGamer.isWin = true
        makeSound('win')
        gameOver()
        return
    }
}

function getGamerHTML(deg) {
    return `<div style="transform: rotate(${deg}deg)">${GAMER}</div>`
}



function getNextLocation(eventKeyboard) {
    eventKeyboard.preventDefault()
    var nextLocation = {
        i: gGamer.location.i,
        j: gGamer.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            gGamer.deg = -90
            nextLocation.i--
            break
        case 'ArrowDown':
            gGamer.deg = 90
            nextLocation.i++
            break
        case 'ArrowLeft':
            gGamer.deg = 180
            nextLocation.j--
            break
        case 'ArrowRight':
            gGamer.deg = 0
            nextLocation.j++
            break
        default: return null
    }
    return nextLocation
}

function crash() {
    renderCell(gGamer.location , CRASH)
    renderCell(gBike.location , CRASH)
}