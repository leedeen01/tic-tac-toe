function createPlayer(name, sign) {
    return {name, sign};
}
const cell = document.querySelectorAll('#box');
const finish = document.querySelector('#text');
const end = document.querySelector('#end');
const restart = document.querySelector('.restart');

const game = (function() {
    let win = [[0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]];
    const action = (box, player) => {
        box.innerText = player.sign;
    };
    const result = (player) => {
        return win.some((combi) => combi.every((elem) => cell[elem].innerText == player.sign));
    };
    const restart = () => cell.forEach(n => n.innerText="");
    const draw = () => Array.from(cell).every(n => n.innerText != "");
    return {action, result, restart, draw};
})();


function startGame() {
    end.style.display = "none";
    firstName = prompt("Please enter player1(X) name!");
    secondName = prompt("Please enter player2(O) name!")
    player1 = createPlayer(firstName, "X");
    player2 = createPlayer(secondName, "O");
    restart.addEventListener('click', () => {
        game.restart();
        startGame();
    })
    let turn = player1;
    cell.forEach(ele => {
        ele.addEventListener('click', handleClick, {once: true})
    })
    function handleClick(e) {
        game.action(e.target, turn);
        if (game.result(turn)) {
            finish.innerText = turn.name + " won";
            end.style.display = 'flex';
            end.style.flexDirection = "column";
            end.style.justifyContent = "center";
            end.style.alignItems = "center";
            
            finish.style.innerText = turn.name + " won"
        } else if (game.draw()) {
            end.style.display = 'flex';
            end.style.flexDirection = "column";
            finish.innerText = "draw!"
        }
        if (turn == player1) {
            turn = player2;
        } else {
            turn = player1;
        }

    }
}

startGame()
