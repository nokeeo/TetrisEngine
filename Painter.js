function TetrisPainter(boardHeight, boardWidth) {
    this.update = function(board) {
        if(canvas) {
            ctx = canvas.getContext('2d');
            for(h = 0; h < boardHeight; h++) {
                for(w = 0; w < boardWidth; w++) {
                    console.log(board);
                    tile = board[h][w];
                    if(tile && tile.isActive) {
                        x = w * TILE_WIDTH;
                        y = h * TILE_HEIGHT;
                        drawTile(x, y, tile, ctx);   
                    }
                }
            }
        }
    }
    
    function drawTile(x, y, tile, ctx) {
        ctx.fillStyle = tile.color;
        ctx.fillRect(x, y, TILE_WIDTH + 1, TILE_HEIGHT + 1);
    }
    
    var canvas = document.getElementById('tetrisCanvas');
    var TILE_HEIGHT = canvas.clientHeight / boardHeight;
    var TILE_WIDTH = canvas.clientWidth / boardWidth;
}