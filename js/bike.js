
const BIKE = '<img class="bike" src="img/bike.png">'

var gBikeRoad = []
var gBike
var gBikeInterval

function createBike(board) {
    gBike = {
        location: {
            i: 18 ,
            j: 1
        },
        deg: 0
    }
    board[gBike.location.i][gBike.location.j] = BIKE
}

function moveBike() {
    if(!gIsGameOn) return

    const nextLocation = gGamerRoad.shift()

    if(!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if(nextCell === GAMER) {
        gGamer.isWin = false
        crash()
        makeSound('lost')
        gameOver()
        return
    }

    gBoard[gBike.location.i][gBike.location.j] = ROAD

    renderCell(gBike.location , ROAD)

    gBike.location = nextLocation

    gBoard[gBike.location.i][gBike.location.j] = BIKE

    renderCell(gBike.location , getBikeHTML(gBike.deg))
}

function getBikeHTML(deg) {
    return `<div style="transform: rotate(${deg}deg)">${BIKE}</div>`
}