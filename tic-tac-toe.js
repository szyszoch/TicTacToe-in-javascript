window.onload = update;

MOVE_NONE   = 0;
MOVE_X      = 1;
MOVE_O      = 2;

board =  [  [0,0,0], 
            [0,0,0], 
            [0,0,0]];

turn = MOVE_O;
gameover = false;
winner = MOVE_NONE;

function update() 
{
    var content = get_board();
    content += get_right_panel();
    document.getElementById('tic-tac-toe').innerHTML = content;
}

function get_board() 
{
    var content = "<table id='board'>";

    for(y=0;y<3;y++) {
        content += "<tr>";
        for(x=0;x<3;x++) {
            content += "<td class='piece' id='piece["+x+","+y+"]' style='float: left'";
            if (board[y][x] == MOVE_O) {
                content += ">";
                content += "<img src='img/o.svg' style='width: 100%'>";
            }
            else if (board[y][x] == MOVE_X) {
                content += ">";
                content += "<img src='img/x.svg' style='width: 100%'>";
            }
            else {
                if (gameover)
                    content += ">";
                else
                    content += "onclick='move("+x+","+y+")'>";
            }
            content += "</td>";
        }
        content += "</tr>";
    }

    content += "</table>";
    
    return content;
}

function get_right_panel()
{
    var content = "<div id='right_panel'>";

    if (!gameover) {
        content += "<h1 style='margin-bottom: 20px'>Turn:</h1>";
        if (turn == MOVE_O)
            content += "<img src='img/o.svg' style='width: 70%'>";
        else if (turn == MOVE_X)
            content += "<img src='img/x.svg' style='width: 70%'>";
    }

    else {
        if (winner == MOVE_O) {
            content += "<h1 style='margin-bottom: 20px'>GameOver! <br/> The winner is:</h1>";
            content += "<img src='img/o.svg' style='width: 70%'>";
        }
        else if (winner == MOVE_X) {
            content += "<h1 style='margin-bottom: 20px'>GameOver! <br/> The winner is:</h1>";
            content += "<img src='img/x.svg' style='width: 70%'>";
        }
        else {
            content += "<h1 style='margin-bottom: 20px'>GameOver! <br/> Nobody won :(</h1>";
        }

        content += "<br />";
        content += "<button id='new_game' onclick='restart()'>Restart</button>";
    }

    content += "</div>";
        return content;
}

function move(x,y) 
{
    board[y][x] = turn;
    if(is_gameover()) {
        gameover = true;
    }

    change_turn();
    update();
}

function change_turn() 
{
    turn = (turn == MOVE_O) ? MOVE_X : MOVE_O;
}

function is_gameover()
{
    // Check if win

    for(x=0;x<3;x++){
        if (board[0][x] == board[1][x] && board[1][x] == board[2][x] && board[0][x] > MOVE_NONE) {
            winner = turn;
            return true;
        }
    }

    for(y=0;y<3;y++){
        if (board[y][0] == board[y][1] && board[y][1] == board[y][2] && board[y][0] > MOVE_NONE) {
            winner = turn;
            return true;
        }
    }

    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] > MOVE_NONE) {
        winner = turn;
        return true;
    }

    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] > MOVE_NONE) {
        winner = turn;
        return true;
    }

    // Check if draw

    for(x=0;x<3;x++) {
        for(y=0;y<3;y++) {
            if (board[y][x] == MOVE_NONE) {
                winner = MOVE_NONE;
                return false;
            }
        }
    }

    return true;
}

function restart() 
{
    board =  [  [0,0,0], 
                [0,0,0], 
                [0,0,0]];
    gameover = false;
    update();
}