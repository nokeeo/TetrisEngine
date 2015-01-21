var TetrisEngine = function(boardHeight, boardWidth) {
    this.board = new Array(boardHeight);
    this.currentPiece = null;
    
    this.startNewGame = function() {
        resetBoard();
        spawnNewPiece();
    }
    
    this.movePieceVertical = function(magnitude) {
        newYPosition = currentPieceY + magnitude;
        console.log(selfReference.currentPiece);
        if(newYPosition >= 0 && newYPosition + selfReference.currentPiece.height() <= boardHeight) {
            currentPieceY = newYPosition;
            postUpdateToPainter();
        }
    }
    
    this.movePieceHorizontal = function(magnitude) {
        newXPosition = currentPieceX + magnitude;
        console.log(selfReference.currentPiece.width());
        if(newXPosition >= 0 && newXPosition + selfReference.currentPiece.width() <= boardWidth) {
            currentPieceX = newXPosition;
            postUpdateToPainter();
        }
    }
    
    function resetBoard() {
        //Initialize the board
        for(h = 0; h < boardHeight; h++) {
            selfReference.board[h] = new Array(boardWidth);
            for(w = 0; w < boardWidth; w++) {
                selfReference.board[h][w] = new Tile(false);   
            }
        }
        
        currentPieceX = Math.floor(boardWidth / 2);
        currentPieceY = 0;
    }
    
     function spawnNewPiece() {
        selfReference.currentPiece = new SPiece();
        postUpdateToPainter();
    }
    
    function postUpdateToPainter() {
        //Deep copy the current board and add the current piece
        piece = selfReference.currentPiece;
        drawBoard = JSON.parse(JSON.stringify(selfReference.board));
        for(h = 0; h < piece.tiles.length; h++) {
            row = piece.tiles[h];
            for(w = 0; w < row.length; w++) {
                newTile = new Tile(row[w]);
                newTile.color = 'red';
                drawBoard[currentPieceY + h][currentPieceX + w] = newTile;
            }
        }
        selfReference.painter.update(drawBoard);    
    }
    
    var selfReference = this;
    var currentPieceX = 0;
    var currentPieceY = 0;
    resetBoard();
};

var Tile = function(isActive) {
    this.isActive = isActive;
    this.color = '#FFFFFF';
}

function Piece() {
    this.tiles = [];
}

Piece.prototype.height = function() {
    return this.tiles.length;   
}

Piece.prototype.width = function() {
    if(this.height() > 0) {
        return this.tiles[0].length;   
    }
    return 0;
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