import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );  
}
  
class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            warning: null
        };
    }

    handleClick(i){
        const squares = this.state.squares.slice();
        var free = freeSquare(squares);
        var win = calculateWinner(squares);
        
        if(free === 1 && !win){
            if(squares[i] === 'X' || squares[i] === 'O' ){
                this.setState({
                    warning: 'Case deja prise'
                });
            }else{
                squares[i] = this.state.xIsNext ? 'X' : 'O';
                this.setState({
                    squares: squares,
                    xIsNext: !this.state.xIsNext,
                    warning: null
                });
            }
        }
                        
    }
    
    renderSquare(i) {
        return( 
            <Square 
                value={this.state.squares[i]}
                onClick= {() => this.handleClick(i)} 
            />
        );
    }

    render() {
        var free = freeSquare(this.state.squares);
        var win = calculateWinner(this.state.squares);
        let status;

        if(win){
            status = 'Player Winner: '+(this.state.xIsNext ? 'O' : 'X');
        }else if(!free){
            status = 'Partie fini aucun gagant';
        }
        else{
            status = 'Next player: '+(this.state.xIsNext ? 'X' : 'O');
        }
        
        
        const status2 = (this.state.warning);

        return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
            <div className="status">{status2}</div>
        </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
        <div className="game">
            <div className="game-board">
            <Board />
            </div>
            <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
            </div>
        </div>
        );
    }
}

function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function freeSquare(squares){
    var flag = 0;
    squares.forEach(function(element) {
        if(element == null){
            flag = 1;
        }
    });
    return flag;

}
  
  // ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
  