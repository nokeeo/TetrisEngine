function load() {
    var BOARD_HEIGHT = 22;
    var BOARD_WIDTH = 11;

    var testEngine = new TetrisEngine(BOARD_HEIGHT, BOARD_WIDTH);
    testEngine.painter = new TetrisPainter(BOARD_HEIGHT, BOARD_WIDTH);

    //Register Keyboard Listeners
    var keysDown = {};
    document.addEventListener('keydown', function(e) {
        keysDown[e.keyCode] = true;
    }, false);

    document.addEventListener('keyup', function(e) {
       delete keysDown[e.keyCode];
    }, false);


    function updateInput() {
        //Moves the piece to the left
        if(37 in keysDown) {
            testEngine.movePieceHorizontal(-1);
        }

        //Moves piece to the right
        if(39 in keysDown) {
            testEngine.movePieceHorizontal(1)
        }
        
        //Moves the piece down
        if(40 in keysDown) {
            testEngine.movePieceVertical(1);  
        }
    }

    testEngine.startNewGame();
    setInterval(updateInput, 60);
}