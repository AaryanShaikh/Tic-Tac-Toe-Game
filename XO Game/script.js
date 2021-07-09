const x_cls = 'x'
const o_cls = 'o'
const cellEle = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winMsgEle = document.getElementById('winMsg')
const winText = document.querySelector('[data-win-msg-text]')
let cirTurn
const winCombo = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]
startGame()
const restart = document.getElementById('restartBtn')
restart.addEventListener('click',startGame)
function startGame () {
	cirTurn = false
	cellEle.forEach(cell => {
		cell.classList.remove(x_cls);
		cell.classList.remove(o_cls);
		cell.addEventListener('click',handleClick,{once:true})
	});
	setBoardHoverCls()
	winMsgEle.classList.remove('show')
}

function handleClick (e) {
	const cell = e.target
	const currCls = cirTurn ? o_cls : x_cls 
	placeMark(cell,currCls)
	if (checkWin(currCls)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true);
	} else{
		swapTurns()
		setBoardHoverCls()
	}
}
function isDraw () {
	return [...cellEle].every(cell => {
		return cell.classList.contains(x_cls)||
		cell.classList.contains(o_cls)
	})
}
function endGame (draw) {
	if (draw) {
		winText.innerText = "it's a Draw!"
	} else{
		winText.innerText = `${cirTurn ? "'0'":"'X'"}s Win!`
	}
	winMsgEle.classList.add('show')
}
function checkWin (currCls) {
	return winCombo.some(combo => {
		return combo.every(index => {
			return cellEle[index].classList.contains(currCls)
		})
	})
}
function placeMark(cell,currCls) {
	cell.classList.add(currCls) 
}
function swapTurns() {
	cirTurn = !cirTurn;
}
function setBoardHoverCls () {
	board.classList.remove(x_cls)
	board.classList.remove(o_cls)
	if (cirTurn) {
		board.classList.add(o_cls)
	}else{
		board.classList.add(x_cls)
	}
}
