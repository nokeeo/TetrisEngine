var TetrisEngine = function(boardHeight, boardWidth) {
    this.board = new Array(boardHeight);
    
    this.startNewGame = function() {
        resetBoard();
        spawnNewPiece();
    }
    
    function resetBoard() {
        //Initialize the board
        for(h = 0; h < boardHeight; h++) {
            selfReference.board[h] = new Array(boardWidth);
            for(w = 0; w < boardWidth; w++) {
                selfReference.board[h][w] = new Tile(false);   
            }
        }
    }
    
     function spawnNewPiece() {
        newPiece = new SPiece();
        drawBoard = selfReference.board;
        for(h = 0; h < newPiece.tiles.length; h++) {
            row = newPiece.tiles[h];
            for(w = 0; w < row.length; w++) {
                newTile = new Tile(row[w]);
                newTile.color = 'red';
                drawBoard[currentPieceY + h][currentPieceX + w] = newTile;
            }
        }
        selfReference.painter.update(drawBoard);
    }
    
    var selfReference = this;
    var currentPieceX = 3;
    var currentPieceY = 5;
    resetBoard();
};

var Tile = function(isActive) {
    this.isActive = isActive;
    this.color = '#FFFFFF';
}

function Piece() {
    this.tiles = [];   
}

function OPiece() {
    this.tiles = [
        [1, 1],
        [1, 1],
    ];
}
OPiece.prototype = new Piece();

function IPiece() {
    this.tiles = [
        [1],
        [1],
        [1],
        [1]
    ];
}
OPiece.prototype = new Piece();

function SPiece() {
    this.tiles = [
        [0, 1, 1],
        [1, 1, 0]
    ];
}
SPiece.prototype = new Piece();

function ZPiece() {
    this.tiles = [
        [1, 1, 0],
        [0, 1, 1]
    ];
}
ZPiece.prototype = new Piece();

function LPiece() {
    this.tiles = [
        [1, 0],
        [1, 0],
        [1, 1]
    ];
}
LPiece.prototype = new Piece();

function JPiece() {
    this.tiles = [
        [0, 1],
        [0, 1],
        [1, 1]
    ];
}
JPiece.prototype = new Piece();

function TPiece() {
    this.tiles = [
        [1, 1, 1],
        [0, 1, 0]
    ];
}
TPiece.prototype = new Piece();