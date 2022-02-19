const gridBtns = document.querySelectorAll('.box');

let xTurn = 1;
let grid = [
    [0, 0, 0], 
    [0, 0, 0], 
    [0, 0, 0]
];

const toggle = function() {
    const id = parseInt(this.id);
    const i = (Math.floor(id / 3));
    const j = id % 3;
    if (xTurn === 1){
        this.textContent = "X";
        grid[i][j] = 1;
    }
    else if (xTurn === -1){
        this.textContent = "O";
        grid[i][j] = 2;
    }

    if (check(i, j, xTurn))
    {
        document.querySelector('#winner').textContent = `${xTurn == 1? "X": "O"}`;
        for (let btn of gridBtns){
            btn.removeEventListener('click', toggle);
        }        
    }
    xTurn = -xTurn;
}

function check(i, v, turn){
    const symbol = (turn == -1? 2 : 1);
    let strSymbol = `${symbol},${symbol},${symbol}`;;
    let win = false;

    //horizontal match
    if (grid[i].toString() == strSymbol) {
        return true;
    }

    //vertical match
    win = true;
    for (let index = 0; index < grid.length; index++) {
        if (grid[index][v] != symbol){
            win = false;
            break;
        }
    }

    if (win == true) {
        return true;
    }

    win = true;
    //diagonal left to right
    for (let index = 0; index < grid.length; index++) {
        for (let j = 0; j < grid.length; j++) {
            if (index == j) {
                if (grid[index][j] != symbol) {
                    win = false;
                    break;
                }
            }
        }
        if (win == false){
            break;
        }
    }

    if (win == true) {
        return true;
    }

    win = true;
    let index = 0;
    let j = grid.length - 1;
    while (index < grid.length)
    {
        if (grid[index][j] != symbol) {
        win = false;
            break;
        }
        index++;
        j--;
    }

    if (win == true) {
        return true;
    }
}

for (let btn of gridBtns){
    btn.addEventListener('click', toggle, {once: true});
}
