import React from 'react';
import './board.css'
import { Container, Row } from 'react-bootstrap';
import Square from './Square';

var arr;
function initialize() {
    arr = new Array(3);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(3);
    }
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            arr[i][j] = "";
        }
    }
}

function didEnd() {
    for (var i = 0; i < 3; i++) {
        if (arr[i][0] === arr[i][1] && arr[i][1] === arr[i][2] && arr[i][0] !== "") {
            return true;
        }
    }
    for (var i = 0; i < 3; i++) {
        if (arr[0][i] === arr[1][i] && arr[1][i] === arr[2][i] && arr[0][i] !== "") {
            return true;
        }
    }
    for (var i = 0; i < 1; i++) {
        if (arr[i][i] === arr[i + 1][i + 1] && arr[i + 1][i + 1] === arr[i + 2][i + 2] && arr[i + 1][i + 1] !== "") {
            return true;
        }
    }
    for (var i = 0; i < 1; i++) {
        if (arr[i][2 - i] === arr[i + 1][1 - i] && arr[i + 1][1 - i] === arr[i + 2][i] && arr[i + 1][1] !== "") {
            return true; // there may be error check again
        }
    }
    return false;
}
function isFull() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (arr[i][j] == "") {
                return false;
            }
        }
    }
    return true;
}
function minimax(maximizing, depth) {
    if (didEnd() === true && maximizing === true) {
        return -1;
    }
    if (didEnd() === true && maximizing === false) {
        return 1;
    }
    if (isFull() === true) {
        return 0;
    }
    if (depth === Infinity) {
        return 0;
    }
    var index_i, index_j, score = Infinity;
    if (maximizing) {
        var bestScore = -Infinity;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (arr[i][j] === "") {
                    arr[i][j] = "0";
                    score = minimax(false, depth + 1);
                    arr[i][j] = "";
                    if (score > bestScore) {
                        bestScore = score;
                    }
                }
            }
        }
        return bestScore;
    }
    else {
        var bestScore = Infinity;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (arr[i][j] === "") {
                    arr[i][j] = "X";
                    score = minimax(true, depth + 1);
                    arr[i][j] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}
function move() {

    if (isFull() == true) {
        return "Tie";
    }
    if (didEnd() == true) {
        return "Computer Lost";
    }

    var index_i, index_j;
    var bestScore = -Infinity;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (arr[i][j] === "") {
                arr[i][j] = "0";
                var score = minimax(false, 0);
                arr[i][j] = "";
                if (score > bestScore) {
                    bestScore = score;
                    index_i = i;
                    index_j = j;
                }
            }
        }
    }
    arr[index_i][index_j] = "0";
    return { index_i, index_j };
}

var turn = 'H';

function Game() {
    // alert('Game begins');
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = { res: "Players Turn", one: "", two: "", three: "", four: "", five: "", six: "", seven: "", eight: "", nine: "" };
    }

    onImageClick = (event) => {
        event.persist();
        console.log(event.target.id);
        switch (event.target.id) {
            case '1': {
                arr[0][0] = 'X';
                this.setState({ one: 'X' });
                var result = move();
                console.log(result);
                if (result.index_i == 0 && result.index_j == 0) {
                    this.setState({ one: "0" });
                } else if (result.index_i == 0 && result.index_j == 1) {
                    this.setState({ two: "0" });
                } else if (result.index_i == 0 && result.index_j == 2) {
                    this.setState({ three: "0" })
                } else if (result.index_i == 1 && result.index_j == 0) {
                    this.setState({ four: "0" });
                } else if (result.index_i == 1 && result.index_j == 1) {
                    this.setState({ five: "0" });
                } else if (result.index_i == 1 && result.index_j == 2) {
                    this.setState({ six: "0" });
                } else if (result.index_i == 2 && result.index_j == 0) {
                    this.setState({ seven: "0" });
                } else if (result.index_i == 2 && result.index_j == 1) {
                    this.setState({ eight: "0" });
                } else if (result.index_i == 2 && result.index_j == 2) {
                    this.setState({ nine: "0" });
                } else {
                    this.setState({ res: result });
                }
                if (didEnd() == true) {
                    this.setState({ res: "PLAYER LOST" });
                    alert("YOU LOST !! RELOAD TO PLAY AGAIN");
                }
                break;
            }
            case '2': {
                arr[0][1] = 'X';
                this.setState({ two: 'X' });
                var result = move();
                console.log(result);
                if (result.index_i == 0 && result.index_j == 0) {
                    this.setState({ one: "0" });
                } else if (result.index_i == 0 && result.index_j == 1) {
                    this.setState({ two: "0" });
                } else if (result.index_i == 0 && result.index_j == 2) {
                    this.setState({ three: "0" })
                } else if (result.index_i == 1 && result.index_j == 0) {
                    this.setState({ four: "0" });
                } else if (result.index_i == 1 && result.index_j == 1) {
                    this.setState({ five: "0" });
                } else if (result.index_i == 1 && result.index_j == 2) {
                    this.setState({ six: "0" });
                } else if (result.index_i == 2 && result.index_j == 0) {
                    this.setState({ seven: "0" });
                } else if (result.index_i == 2 && result.index_j == 1) {
                    this.setState({ eight: "0" });
                } else if (result.index_i == 2 && result.index_j == 2) {
                    this.setState({ nine: "0" });
                } else {
                    this.setState({ res: result });
                }
                if (didEnd() == true) {
                    this.setState({ res: "PLAYER LOST" });
                    alert("YOU LOST !! RELOAD TO PLAY AGAIN");

                }
                break;
            }
            case '3': {
                arr[0][2] = 'X';
                this.setState({ three: 'X' });
                var result = move();
                console.log(result);
                if (result.index_i == 0 && result.index_j == 0) {
                    this.setState({ one: "0" });
                } else if (result.index_i == 0 && result.index_j == 1) {
                    this.setState({ two: "0" });
                } else if (result.index_i == 0 && result.index_j == 2) {
                    this.setState({ three: "0" })
                } else if (result.index_i == 1 && result.index_j == 0) {
                    this.setState({ four: "0" });
                } else if (result.index_i == 1 && result.index_j == 1) {
                    this.setState({ five: "0" });
                } else if (result.index_i == 1 && result.index_j == 2) {
                    this.setState({ six: "0" });
                } else if (result.index_i == 2 && result.index_j == 0) {
                    this.setState({ seven: "0" });
                } else if (result.index_i == 2 && result.index_j == 1) {
                    this.setState({ eight: "0" });
                } else if (result.index_i == 2 && result.index_j == 2) {
                    this.setState({ nine: "0" });
                } else {
                    this.setState({ res: result });
                }
                if (didEnd() == true) {
                    this.setState({ res: "PLAYER LOST" });
                    alert("YOU LOST !! RELOAD TO PLAY AGAIN");

                }
                break;
            }
            case '4': {
                arr[1][0] = 'X';
                this.setState({ four: 'X' });
                var result = move();
                console.log(result);
                if (result.index_i == 0 && result.index_j == 0) {
                    this.setState({ one: "0" });
                } else if (result.index_i == 0 && result.index_j == 1) {
                    this.setState({ two: "0" });
                } else if (result.index_i == 0 && result.index_j == 2) {
                    this.setState({ three: "0" })
                } else if (result.index_i == 1 && result.index_j == 0) {
                    this.setState({ four: "0" });
                } else if (result.index_i == 1 && result.index_j == 1) {
                    this.setState({ five: "0" });
                } else if (result.index_i == 1 && result.index_j == 2) {
                    this.setState({ six: "0" });
                } else if (result.index_i == 2 && result.index_j == 0) {
                    this.setState({ seven: "0" });
                } else if (result.index_i == 2 && result.index_j == 1) {
                    this.setState({ eight: "0" });
                } else if (result.index_i == 2 && result.index_j == 2) {
                    this.setState({ nine: "0" });
                } else {
                    this.setState({ res: result });
                }
                if (didEnd() == true) {
                    this.setState({ res: "PLAYER LOST" });
                    alert("YOU LOST !! RELOAD TO PLAY AGAIN");

                }
                break;
            }
            case '5': {
                arr[1][1] = 'X';
                this.setState({ five: 'X' });
                var result = move();
                console.log(result);
                if (result.index_i == 0 && result.index_j == 0) {
                    this.setState({ one: "0" });
                } else if (result.index_i == 0 && result.index_j == 1) {
                    this.setState({ two: "0" });
                } else if (result.index_i == 0 && result.index_j == 2) {
                    this.setState({ three: "0" })
                } else if (result.index_i == 1 && result.index_j == 0) {
                    this.setState({ four: "0" });
                } else if (result.index_i == 1 && result.index_j == 1) {
                    this.setState({ five: "0" });
                } else if (result.index_i == 1 && result.index_j == 2) {
                    this.setState({ six: "0" });
                } else if (result.index_i == 2 && result.index_j == 0) {
                    this.setState({ seven: "0" });
                } else if (result.index_i == 2 && result.index_j == 1) {
                    this.setState({ eight: "0" });
                } else if (result.index_i == 2 && result.index_j == 2) {
                    this.setState({ nine: "0" });
                } else {
                    this.setState({ res: result });
                }
                if (didEnd() == true) {
                    this.setState({ res: "PLAYER LOST" });
                    alert("YOU LOST !! RELOAD TO PLAY AGAIN");

                }
                break;
            }
            case '6': {
                arr[1][2] = 'X';
                this.setState({ six: 'X' });
                var result = move();
                console.log(result);
                if (result.index_i == 0 && result.index_j == 0) {
                    this.setState({ one: "0" });
                } else if (result.index_i == 0 && result.index_j == 1) {
                    this.setState({ two: "0" });
                } else if (result.index_i == 0 && result.index_j == 2) {
                    this.setState({ three: "0" })
                } else if (result.index_i == 1 && result.index_j == 0) {
                    this.setState({ four: "0" });
                } else if (result.index_i == 1 && result.index_j == 1) {
                    this.setState({ five: "0" });
                } else if (result.index_i == 1 && result.index_j == 2) {
                    this.setState({ six: "0" });
                } else if (result.index_i == 2 && result.index_j == 0) {
                    this.setState({ seven: "0" });
                } else if (result.index_i == 2 && result.index_j == 1) {
                    this.setState({ eight: "0" });
                } else if (result.index_i == 2 && result.index_j == 2) {
                    this.setState({ nine: "0" });
                } else {
                    this.setState({ res: result });
                }
                if (didEnd() == true) {
                    this.setState({ res: "PLAYER LOST" });
                    alert("YOU LOST !! RELOAD TO PLAY AGAIN");

                }
                break;
            }
            case '7': {
                arr[2][0] = 'X';
                this.setState({ seven: 'X' });
                var result = move();
                console.log(result);
                if (result.index_i == 0 && result.index_j == 0) {
                    this.setState({ one: "0" });
                } else if (result.index_i == 0 && result.index_j == 1) {
                    this.setState({ two: "0" });
                } else if (result.index_i == 0 && result.index_j == 2) {
                    this.setState({ three: "0" })
                } else if (result.index_i == 1 && result.index_j == 0) {
                    this.setState({ four: "0" });
                } else if (result.index_i == 1 && result.index_j == 1) {
                    this.setState({ five: "0" });
                } else if (result.index_i == 1 && result.index_j == 2) {
                    this.setState({ six: "0" });
                } else if (result.index_i == 2 && result.index_j == 0) {
                    this.setState({ seven: "0" });
                } else if (result.index_i == 2 && result.index_j == 1) {
                    this.setState({ eight: "0" });
                } else if (result.index_i == 2 && result.index_j == 2) {
                    this.setState({ nine: "0" });
                } else {
                    this.setState({ res: result });
                }
                if (didEnd() == true) {
                    this.setState({ res: "PLAYER LOST" });
                    alert("YOU LOST !! RELOAD TO PLAY AGAIN");

                }
                break;
            }
            case '8': {
                arr[2][1] = 'X';
                this.setState({ eight: 'X' });
                var result = move();
                console.log(result);
                if (result.index_i == 0 && result.index_j == 0) {
                    this.setState({ one: "0" });
                } else if (result.index_i == 0 && result.index_j == 1) {
                    this.setState({ two: "0" });
                } else if (result.index_i == 0 && result.index_j == 2) {
                    this.setState({ three: "0" })
                } else if (result.index_i == 1 && result.index_j == 0) {
                    this.setState({ four: "0" });
                } else if (result.index_i == 1 && result.index_j == 1) {
                    this.setState({ five: "0" });
                } else if (result.index_i == 1 && result.index_j == 2) {
                    this.setState({ six: "0" });
                } else if (result.index_i == 2 && result.index_j == 0) {
                    this.setState({ seven: "0" });
                } else if (result.index_i == 2 && result.index_j == 1) {
                    this.setState({ eight: "0" });
                } else if (result.index_i == 2 && result.index_j == 2) {
                    this.setState({ nine: "0" });
                } else {
                    this.setState({ res: result });
                }
                if (didEnd() == true) {
                    this.setState({ res: "PLAYER LOST" });
                    alert("YOU LOST !! RELOAD TO PLAY AGAIN");

                }
                break;
            }
            case '9': {
                arr[2][2] = 'X';
                this.setState({ nine: 'X' });
                var result = move();
                console.log(result);
                if (result.index_i == 0 && result.index_j == 0) {
                    this.setState({ one: "0" });
                } else if (result.index_i == 0 && result.index_j == 1) {
                    this.setState({ two: "0" });
                } else if (result.index_i == 0 && result.index_j == 2) {
                    this.setState({ three: "0" })
                } else if (result.index_i == 1 && result.index_j == 0) {
                    this.setState({ four: "0" });
                } else if (result.index_i == 1 && result.index_j == 1) {
                    this.setState({ five: "0" });
                } else if (result.index_i == 1 && result.index_j == 2) {
                    this.setState({ six: "0" });
                } else if (result.index_i == 2 && result.index_j == 0) {
                    this.setState({ seven: "0" });
                } else if (result.index_i == 2 && result.index_j == 1) {
                    this.setState({ eight: "0" });
                } else if (result.index_i == 2 && result.index_j == 2) {
                    this.setState({ nine: "0" });
                } else {
                    this.setState({ res: result });
                }
                if (didEnd() == true) {
                    this.setState({ res: "PLAYER LOST" });
                    alert("YOU LOST !! RELOAD TO PLAY AGAIN");
                }
                break;
            }
        }
    }

    componentDidMount() {
        initialize();
        Game();
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Square id="1" onClick={this.onImageClick} value={this.state.one}></Square>
                        <Square id="2" onClick={this.onImageClick} value={this.state.two}></Square>
                        <Square id="3" onClick={this.onImageClick} value={this.state.three}></Square>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Square id="4" onClick={this.onImageClick} value={this.state.four}></Square>
                        <Square id="5" onClick={this.onImageClick} value={this.state.five}></Square>
                        <Square id="6" onClick={this.onImageClick} value={this.state.six}></Square>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Square id="7" onClick={this.onImageClick} value={this.state.seven}></Square>
                        <Square id="8" onClick={this.onImageClick} value={this.state.eight}></Square>
                        <Square id="9" onClick={this.onImageClick} value={this.state.nine}></Square>
                    </Row>
                    <p> {this.state.res} </p>
                </Container>
            </div >
        )
    }
}

export default Board;