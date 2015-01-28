var TetrisEngine = function(boardHeight, boardWidth) {
    this.board = new Array(boardHeight);
    this.currentPiece = null;
    
    this.startNewGame = function() {
        resetBoard();
        spawnNewPiece();
    }
    
    this.movePieceVertical = function(magnitude) {
        newYPosition = currentPieceY + magnitude;
        if(!checkVerticalCollision()) {
            if(newYPosition >= 0 && newYPosition + selfReference.currentPiece.height() <= boardHeight) {
                currentPieceY = newYPosition;
                postUpdateToPainter();
            }
        }
        else {
            commitPieceToBoard();
        }
    }
    
    this.movePieceHorizontal = function(magnitude) {
        newXPosition = currentPieceX + magnitude;
        
        canMoveRight = magnitude > 0 && !checkForHorizontalRightCollision();
        canMoveLeft = magnitude < 0 && !checkForHorizontalLeftCollision();
        
        canMove = canMoveRight || canMoveLeft;
        if(canMove && newXPosition >= 0 && newXPosition + selfReference.currentPiece.width() <= boardWidth) {
            currentPieceX = newXPosition;
            postUpdateToPainter();
        }
    }
    
    this.rotateCurrentPiece = function() {
        selfReference.currentPiece.rotate();
        postUpdateToPainter();
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
        currentPieceX = Math.floor(boardWidth / 2);
        currentPieceY = 0;
         
        selfReference.currentPiece = new SPiece();
        postUpdateToPainter();
    }
    
    function createBoardWithCurrentPiece() {
        //Deep copy the current board and add the current piece
        piece = selfReference.currentPiece;
        drawBoard = JSON.parse(JSON.stringify(selfReference.board));
        for(h = 0; h < piece.height(); h++) {
            row = piece.tiles[h];
            for(w = 0; w < piece.width(); w++) {
                if(row[w]) {
                    newTile = new Tile(row[w]);
                    newTile.color = 'red';
                    drawBoard[currentPieceY + h][currentPieceX + w] = newTile;
                }
            }
        }
        return drawBoard;
    }
    
    function postUpdateToPainter() {
        drawBoard = createBoardWithCurrentPiece();
        selfReference.painter.update(drawBoard);    
    }
    
    function checkVerticalCollision() {
        if(selfReference.currentPiece.height() + currentPieceY == boardHeight) {
            return true;   
        }
        else {
            //Check to see if the current piece has any collisions with the board
            for(w = 0; w < selfReference.currentPiece.width(); w++) {
                for(h = selfReference.currentPiece.height() - 1; h >= 0; h--) {
                    boardTile = selfReference.board[h + currentPieceY + 1][w + currentPieceX];
                    pieceTile = selfReference.currentPiece.tiles[h][w];
                    if(boardTile.isActive && pieceTile) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    function checkForHorizontalLeftCollision() {
        for(h = 0; h < selfReference.currentPiece.height(); h++) {
            for(w = 0; w < selfReference.currentPiece.width(); w++) {
                pieceTile = selfReference.currentPiece.tiles[h][w];
                boardPiece = selfReference.board[h + currentPieceY][w + currentPieceX - 1];
                if(boardPiece && boardPiece.isActive && pieceTile) {
                    return true;   
                }
            }
        }
        return false;
    }
    
    function checkForHorizontalRightCollision() {
        for(h = 0; h < selfReference.currentPiece.height(); h++) {
            for(w = 0; w < selfReference.currentPiece.width(); w++) {
                pieceTile = selfReference.currentPiece.tiles[h][w];
                boardPiece = selfReference.board[h + currentPieceY][w + currentPieceX + 1];
                if(boardPiece && boardPiece.isActive && pieceTile) {
                    return true;   
                }
            }
        }
        return false;
    }
    
    function commitPieceToBoard() {
        selfReference.board = createBoardWithCurrentPiece();
        spawnNewPiece();
        postUpdateToPainter();
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

Piece.prototype.rotate = function() {
    
    //Transpose the tile matrix
    transposed = []
    for(x = 0; x < this.width(); x++) {
        transposed[x] = [];
        for(y = 0; y < this.height(); y++) {
            transposed[x][y] = this.tiles[y][x];
        }
    }
    
    //Reverse rows of transposed matrix
    reversed = [];
    for(y = 0; y < this.width(); y++) {
        reversed[y] = [];
        for(x = 0; x < this.height(); x++) {
            reversed[y][x] = transposed[y][this.height() - 1 - x];
        }
    }
    this.tiles = reversed;
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