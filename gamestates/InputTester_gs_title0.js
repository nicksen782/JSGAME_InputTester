_APP.game.gamestates["gs_title0"] = {
    // Variables within this game state.

    // Ending delay timer. 
    endDelay: {
        started: undefined,
        finished: undefined,
        maxFrames: undefined,
        frameCount: undefined,
    },

    inited: false,

    // Constants within this game state.
    //

    // Run once upon changing to this game state.
    init: async function(){
        console.log("gs_title0 init");

        // Clear the screen.
        _GFX.VRAM.clearVram();

        // Init the endDelay values. 
        this.endDelay.finished   = false
        this.endDelay.started    = false
        this.endDelay.maxFrames  = _APP.game.shared.msToFrames(500, _APP.game.gameLoop.msFrame);
        this.endDelay.frameCount = 0;

        let speedMs = _APP.game.shared.msToFramesToMs(_APP.game.gameLoop.msFrame * 3, _APP.game.gameLoop.msFrame);
        await _GFX.fade.blocking.fadeIn(speedMs, true);

        _GFX.util.tiles.print({ str:"Text string.", x:0, y:0, tsi:1, li:2 });

        this.endDelay.started = true; 
        this.inited = true; 
    },

    // Main function of this game state. Calls other functions/handles logic, etc.
    main: async function(){
        if(!this.inited){ this.init(); return; }

        // Delay before progressing to the next game state?
        if(this.endDelay.started){
            // console.log("endDelay is running.");
            if(this.endDelay.frameCount >= this.endDelay.maxFrames && !this.endDelay.finished){
                // Set the endDelay finished flag (Not needed. Here for completeness.)
                // console.log("endDelay finished.");
                this.endDelay.finished = true;

                let speedMs = _APP.game.shared.msToFramesToMs(_APP.game.gameLoop.msFrame * 3, _APP.game.gameLoop.msFrame);
                await _GFX.fade.blocking.fadeOut(speedMs, true);
            }
            else if(this.endDelay.finished){
                // Set the next game state.
                // game("TITLE1", true);
                // _APP.game.changeGamestate1("gs_title0");
                // _APP.game.changeGamestate1("gs_title1");
                _APP.game.changeGamestate1("gs_tester");
            }
            else{
                // console.log("endDelay: Adding to frameCount.");
                this.endDelay.frameCount += 1;
            }
        }
    },

};