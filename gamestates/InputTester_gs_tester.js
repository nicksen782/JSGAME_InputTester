_APP.game.gamestates["gs_tester"] = {
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
        // console.log("gs_tester init");

        // Clear the screen.
        _GFX.VRAM.clearVram();

        // Init the endDelay values. 
        this.endDelay.finished   = false
        this.endDelay.started    = false
        this.endDelay.maxFrames  = _APP.game.shared.msToFrames(500, _APP.game.gameLoop.msFrame);
        this.endDelay.frameCount = 0;

        let speedMs = _APP.game.shared.msToFramesToMs(_APP.game.gameLoop.msFrame * 3, _APP.game.gameLoop.msFrame);
        await _GFX.fade.blocking.fadeIn(speedMs, true);

        
        // this.endDelay.started = true; 
        
        let lines = [
            "INPUT TESTER.",
            "Test the keyboard/gamepad inputs here.",
            "",
            "",
        ];
        let x=0;
        let y=0;
        for(let i=0, l=lines.length; i<l; i+=1){
            _GFX.util.tiles.print({ x:x, y:y++, tsi:1, li:2, str:lines[i] });
        }
        lines = [
            "Player inputs are shown to the left/right.",
            "Next, the button mapped raw input.",
            "Next, the browser raw input.",
            "",
            "",
            "",
            "",
        ];
        x=0;
        y=35;
        for(let i=0, l=lines.length; i<l; i+=1){
            _GFX.util.tiles.print({ x:x, y:y++, tsi:1, li:2, str:lines[i] });
        }
        
        // x=1;
        // y=18;
        // _GFX.util.tiles.print({ x:x, y:y, tsi:1, li:2, str:"GAMEPAD #1" });
        // _GFX.util.tiles.print({ x:x+19, y:y, tsi:1, li:2, str:"GAMEPAD #2" });
        // _GFX.util.tiles.drawTilemap({ tmn:"snesGamepad", x:1+0 , y:y+1, tsi:0, li:0, ri:0 } );
        // _GFX.util.tiles.drawTilemap({ tmn:"snesGamepad", x:1+19, y:y+1, tsi:0, li:0, ri:0 } );
        
        // x=1;
        // y=y+10;
        // _GFX.util.tiles.print({ x:x, y:y, tsi:1, li:2, str:"GAMEPAD #3" });
        // _GFX.util.tiles.print({ x:x+19, y:y, tsi:1, li:2, str:"GAMEPAD #4" });
        // _GFX.util.tiles.drawTilemap({ tmn:"snesGamepad2", x:1+0 , y:y+1, tsi:0, li:0, ri:0 } );
        // _GFX.util.tiles.drawTilemap({ tmn:"snesGamepad2", x:1+19, y:y+1, tsi:0, li:0, ri:0 } );
        this.inited = true; 
        
        let objGamepads = {
            g1:{
                startX:0, startY:5, buttons: { },
                title: { tsi:1, li:2, str: "GAMEPAD #", },
                img: { tmn:"snesGamepad2", tsi:0, li:0, ri:0 }, 
            },
            g2:{
                startX:22, startY:5, buttons: { },
                title: { tsi:1, li:2, str: "GAMEPAD #", },
                img: { tmn:"snesGamepad2", tsi:0, li:0, ri:0 }, 
            },
            
            drawActiveButton: function(gpKey, gpButton, active=false){
                // Get the key and make sure that it is valid.
                let gp = this[gpKey];
                if(!gp){ console.log("drawActiveButton: no match: gpKey", this); return; }
                let coords = gp.buttons[gpButton];
                if(!coords){ console.log("drawActiveButton: no match: gpButton ", this); return; }

                if(active){
                    _GFX.util.tiles.drawTilemap({ tmn:"buttonActive"    , x: coords.x, y: coords.y, tsi:0, li:1, ri:0 } );
                }
                else{
                    _GFX.util.tiles.drawTilemap({ tmn:"transparent_tile", x: coords.x, y: coords.y, tsi:0, li:1, ri:0 } );
                }
            },
            drawGamepad: function(key){
                // Get the key and make sure that it is valid.
                let gp = this[key];
                if(!gp){ console.log("drawGamepad: no match: gpKey", this); return; }

                // Draw the title and the gamepad. 
                _GFX.util.tiles.print      ( { x:gp.title.x, y:gp.title.y, tsi:gp.title.tsi, li:gp.title.li, str:gp.title.str } );
                _GFX.util.tiles.drawTilemap( { x:gp.img.x  , y:gp.img.y  , tsi:gp.img.tsi  , li:gp.img.li  , ri: gp.img.ri, tmn: gp.img.tmn } );
            },

            init: function(){
                let list = ["g1", "g2"];
                for(let i=0, l=list.length; i<l; i+=1){
                    let key = list[i];
                    let gp = this[key];
                    if(!gp){ console.log("init: no match: gpKey", this); return; }

                    this[key].title.str += i+1;
                    this[key].title.x   = gp.startX;
                    this[key].title.y   = gp.startY;
                    this[key].img  .x   = gp.startX + 0;
                    this[key].img  .y   = gp.startY + 1;

                    this[list[i]].buttons = {
                        BTN_SR    : { x:gp.startX + 14, y:gp.startY + 1 },
                        BTN_SL    : { x:gp.startX + 2 , y:gp.startY + 1 },
                        BTN_X     : { x:gp.startX + 12, y:gp.startY + 3 },
                        BTN_A     : { x:gp.startX + 14, y:gp.startY + 4 },
                        BTN_RIGHT : { x:gp.startX + 4 , y:gp.startY + 4 },
                        BTN_LEFT  : { x:gp.startX + 2 , y:gp.startY + 4 },
                        BTN_DOWN  : { x:gp.startX + 3 , y:gp.startY + 5 },
                        BTN_UP    : { x:gp.startX + 3 , y:gp.startY + 3 },
                        BTN_START : { x:gp.startX + 9 , y:gp.startY + 4 },
                        BTN_SELECT: { x:gp.startX + 6 , y:gp.startY + 4 },
                        BTN_Y     : { x:gp.startX + 11, y:gp.startY + 5 },
                        BTN_B     : { x:gp.startX + 13, y:gp.startY + 6 },
                    };
                }

            },
        };
        objGamepads.init();
        // console.log(objGamepads);
        objGamepads.drawGamepad("g1");
        objGamepads.drawGamepad("g2");
        
        this.objGamepads = objGamepads;

        // Horizontal separator.
        _GFX.util.tiles.fillTile({ tid:5, x:0, y:4, w:42, h:1, tsi:0, li:1 });
        _GFX.util.tiles.fillTile({ tid:5, x:0, y:14, w:42, h:1, tsi:0, li:1 });
        _GFX.util.tiles.fillTile({ tid:5, x:0, y:19, w:42, h:1, tsi:0, li:1 });
        _GFX.util.tiles.fillTile({ tid:5, x:0, y:34, w:42, h:1, tsi:0, li:1 });

        // Vertical separator.
        _GFX.util.tiles.fillTile({ tid:1, x:20, y:5, w:1, h:30, tsi:0, li:1 });
        _GFX.util.tiles.fillTile({ tid:2, x:21, y:5, w:1, h:30, tsi:0, li:1 });

        // _GFX.util.tiles.print({ x:0, y:37, tsi:1, li:2, str:"AB0123456789+-"});
    },

    drawRawGamepadData: function(gamepad, index){
        // Allow up to 12 axes and 20 buttons for display. 
        let axes;
        let buttons;
        if(gamepad != null){
            axes       = gamepad.gamepad.axes;
            buttons    = gamepad.gamepad.buttons;
        }
        else{
            axes       = [];
            buttons    = [];
        }
        let axesLen    = axes.length;
        let buttonsLen = buttons.length;
        let axesMaxLen    = 10;
        let buttonsMaxLen = 20;
        let sx = 0 + (index * 22);
        let sy = 20;
        let x=0;
        let y=0;
        let col = 0;

        let drawIt = function(type, index, value){
            if( (value >= -1 && value <= 1) || value == "  " ){
                let str;

                // Normal string. 
                if(value != "  "){ str = `${type}${index.toString().padStart(2, "0")}:${value.toString().padStart(2, " ")}`; }
                
                // Empty string. 
                else{ str = ".".repeat(6); }

                // Last column? Move down a line and reset col to 0;
                if(col == 3){ y+=1; col=0; }

                // First col.
                if(col == 0){
                    x=0; col+=1;
                    _GFX.util.tiles.print({ x:x+sx, y:y+sy, tsi:1, li:2, str:str});
                }
                // Second col.
                else if(col == 1){
                    x=7; col+=1;
                    _GFX.util.tiles.print({ x:x+sx, y:y+sy, tsi:1, li:2, str:str});
                }
                // Third col.
                else if(col == 2){
                    x=14; col+=1;
                    _GFX.util.tiles.print({ x:x+sx, y:y+sy, tsi:1, li:2, str:str});
                }
            }
        };

        _GFX.util.tiles.print({ x:sx, y:sy+y, tsi:1, li:2, str:"-AXES-"});
        y+=1;
        // _GFX.util.tiles.print({ x:sx, y:sy+y, tsi:1, li:2, str:"-".repeat(20)});
        // y+=1;
        for(let i=0, l=axesMaxLen; i<l; i+=1){
            if(i<axesLen && gamepad != null){
                let value = Math.round(axes[i]).toFixed(0); // << 0
                drawIt("A", i, value);
            }
            else{
                drawIt(null, null, "  ");
            }
        }

        col=0;
        y+=1;
        y+=1;
        _GFX.util.tiles.print({ x:sx, y:sy+y, tsi:1, li:2, str:"-BUTTONS-"});
        y+=1;
        // _GFX.util.tiles.print({ x:sx, y:sy+y, tsi:1, li:2, str:"-".repeat(20)});
        // y+=1;
        for(let i=0, l=buttonsMaxLen; i<l; i+=1){
            if(i<buttonsLen && gamepad != null){
                let value = Math.round(buttons[i].value).toFixed(0); // << 0
                drawIt("B", i, value);
            }
            else{
                drawIt(null, null, "  ");
            }
        }
    },

    // Main function of this game state. Calls other functions/handles logic, etc.
    main: async function(){
        if(!this.inited){ this.init(); return; }

        // DISPLAY MAPPED INPUT ON DISPLAYED GAMEPADS: P1
        if(_APP.game.input.obj["p1"].held.BTN_SR)     { this.objGamepads.drawActiveButton("g1", "BTN_SR"    , true); } else{ this.objGamepads.drawActiveButton("g1", "BTN_SR"    , false); }
        if(_APP.game.input.obj["p1"].held.BTN_SL)     { this.objGamepads.drawActiveButton("g1", "BTN_SL"    , true); } else{ this.objGamepads.drawActiveButton("g1", "BTN_SL"    , false); }
        if(_APP.game.input.obj["p1"].held.BTN_X)      { this.objGamepads.drawActiveButton("g1", "BTN_X"     , true); } else{ this.objGamepads.drawActiveButton("g1", "BTN_X"     , false); }
        if(_APP.game.input.obj["p1"].held.BTN_A)      { this.objGamepads.drawActiveButton("g1", "BTN_A"     , true); } else{ this.objGamepads.drawActiveButton("g1", "BTN_A"     , false); }
        if(_APP.game.input.obj["p1"].held.BTN_RIGHT)  { this.objGamepads.drawActiveButton("g1", "BTN_RIGHT" , true); } else{ this.objGamepads.drawActiveButton("g1", "BTN_RIGHT" , false); }
        if(_APP.game.input.obj["p1"].held.BTN_LEFT)   { this.objGamepads.drawActiveButton("g1", "BTN_LEFT"  , true); } else{ this.objGamepads.drawActiveButton("g1", "BTN_LEFT"  , false); }
        if(_APP.game.input.obj["p1"].held.BTN_DOWN)   { this.objGamepads.drawActiveButton("g1", "BTN_DOWN"  , true); } else{ this.objGamepads.drawActiveButton("g1", "BTN_DOWN"  , false); }
        if(_APP.game.input.obj["p1"].held.BTN_UP)     { this.objGamepads.drawActiveButton("g1", "BTN_UP"    , true); } else{ this.objGamepads.drawActiveButton("g1", "BTN_UP"    , false); }
        if(_APP.game.input.obj["p1"].held.BTN_START)  { this.objGamepads.drawActiveButton("g1", "BTN_START" , true); } else{ this.objGamepads.drawActiveButton("g1", "BTN_START" , false); }
        if(_APP.game.input.obj["p1"].held.BTN_SELECT) { this.objGamepads.drawActiveButton("g1", "BTN_SELECT", true); } else{ this.objGamepads.drawActiveButton("g1", "BTN_SELECT", false); }
        if(_APP.game.input.obj["p1"].held.BTN_Y)      { this.objGamepads.drawActiveButton("g1", "BTN_Y"     , true); } else{ this.objGamepads.drawActiveButton("g1", "BTN_Y"     , false); }
        if(_APP.game.input.obj["p1"].held.BTN_B)      { this.objGamepads.drawActiveButton("g1", "BTN_B"     , true); } else{ this.objGamepads.drawActiveButton("g1", "BTN_B"     , false); }

        // DISPLAY MAPPED INPUT ON DISPLAYED GAMEPADS: P2
        if(_APP.game.input.obj["p2"].held.BTN_SR)     { this.objGamepads.drawActiveButton("g2", "BTN_SR"    , true); } else{ this.objGamepads.drawActiveButton("g2", "BTN_SR"    , false); }
        if(_APP.game.input.obj["p2"].held.BTN_SL)     { this.objGamepads.drawActiveButton("g2", "BTN_SL"    , true); } else{ this.objGamepads.drawActiveButton("g2", "BTN_SL"    , false); }
        if(_APP.game.input.obj["p2"].held.BTN_X)      { this.objGamepads.drawActiveButton("g2", "BTN_X"     , true); } else{ this.objGamepads.drawActiveButton("g2", "BTN_X"     , false); }
        if(_APP.game.input.obj["p2"].held.BTN_A)      { this.objGamepads.drawActiveButton("g2", "BTN_A"     , true); } else{ this.objGamepads.drawActiveButton("g2", "BTN_A"     , false); }
        if(_APP.game.input.obj["p2"].held.BTN_RIGHT)  { this.objGamepads.drawActiveButton("g2", "BTN_RIGHT" , true); } else{ this.objGamepads.drawActiveButton("g2", "BTN_RIGHT" , false); }
        if(_APP.game.input.obj["p2"].held.BTN_LEFT)   { this.objGamepads.drawActiveButton("g2", "BTN_LEFT"  , true); } else{ this.objGamepads.drawActiveButton("g2", "BTN_LEFT"  , false); }
        if(_APP.game.input.obj["p2"].held.BTN_DOWN)   { this.objGamepads.drawActiveButton("g2", "BTN_DOWN"  , true); } else{ this.objGamepads.drawActiveButton("g2", "BTN_DOWN"  , false); }
        if(_APP.game.input.obj["p2"].held.BTN_UP)     { this.objGamepads.drawActiveButton("g2", "BTN_UP"    , true); } else{ this.objGamepads.drawActiveButton("g2", "BTN_UP"    , false); }
        if(_APP.game.input.obj["p2"].held.BTN_START)  { this.objGamepads.drawActiveButton("g2", "BTN_START" , true); } else{ this.objGamepads.drawActiveButton("g2", "BTN_START" , false); }
        if(_APP.game.input.obj["p2"].held.BTN_SELECT) { this.objGamepads.drawActiveButton("g2", "BTN_SELECT", true); } else{ this.objGamepads.drawActiveButton("g2", "BTN_SELECT", false); }
        if(_APP.game.input.obj["p2"].held.BTN_Y)      { this.objGamepads.drawActiveButton("g2", "BTN_Y"     , true); } else{ this.objGamepads.drawActiveButton("g2", "BTN_Y"     , false); }
        if(_APP.game.input.obj["p2"].held.BTN_B)      { this.objGamepads.drawActiveButton("g2", "BTN_B"     , true); } else{ this.objGamepads.drawActiveButton("g2", "BTN_B"     , false); }

        // RAW MAPPED INPUT: P1
        _GFX.util.tiles.print({ x:0, y:14+1, tsi:1, li:2, str:"HLD:" + _APP.game.input.raw["p1"].held   .toString(2).padStart(13, 0) });
        _GFX.util.tiles.print({ x:0, y:15+1, tsi:1, li:2, str:"PRS:" + _APP.game.input.raw["p1"].press  .toString(2).padStart(13, 0) });
        _GFX.util.tiles.print({ x:0, y:16+1, tsi:1, li:2, str:"PRV:" + _APP.game.input.raw["p1"]._prev  .toString(2).padStart(13, 0) });
        _GFX.util.tiles.print({ x:0, y:17+1, tsi:1, li:2, str:"REL:" + _APP.game.input.raw["p1"].release.toString(2).padStart(13, 0) });

        // RAW MAPPED INPUT: P2
        _GFX.util.tiles.print({ x:22, y:14+1, tsi:1, li:2, str:"HLD:" + _APP.game.input.raw["p2"].held   .toString(2).padStart(13, 0) });
        _GFX.util.tiles.print({ x:22, y:15+1, tsi:1, li:2, str:"PRS:" + _APP.game.input.raw["p2"].press  .toString(2).padStart(13, 0) });
        _GFX.util.tiles.print({ x:22, y:16+1, tsi:1, li:2, str:"PRV:" + _APP.game.input.raw["p2"]._prev  .toString(2).padStart(13, 0) });
        _GFX.util.tiles.print({ x:22, y:17+1, tsi:1, li:2, str:"REL:" + _APP.game.input.raw["p2"].release.toString(2).padStart(13, 0) });
        
        // RAW UNMAPPED GAMEPAD: P1
        // if(_INPUT.gamepad.gp_list[0]){ this.drawRawGamepadData(_INPUT.gamepad.gp_list[0], 0); }
        // if(_INPUT.gamepad.gp_list[1]){ this.drawRawGamepadData(_INPUT.gamepad.gp_list[1], 1); }
        this.drawRawGamepadData(_INPUT.gamepad.gp_list[0], 0);
        this.drawRawGamepadData(_INPUT.gamepad.gp_list[1], 1);

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
                // _APP.game.changeGamestate1("gs_tester");
            }
            else{
                // console.log("endDelay: Adding to frameCount.");
                this.endDelay.frameCount += 1;
            }
        }
    },

};